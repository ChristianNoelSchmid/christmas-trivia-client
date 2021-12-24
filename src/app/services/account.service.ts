import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subject, tap } from 'rxjs';
import { SITE_URL } from '../constants';
import { Account } from '../models/account.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private _current: Observable<Account | null> = of(null);
  private _users: Observable<Map<number, User> | null> = of(null);
  private _pictureUri: Observable<string | null> = of(null);
  private _answers: Observable<Map<number, string> | null> = of(null);
  private _creatureRates: Observable<Map<number, number> | null> = of(null);
  private _ssRecipient: Observable<User | null> = of(null);

  constructor(private http: HttpClient) {}

  private getUsers(account: Account): Observable<User[] | null> {
      return this.http.get<User[]>(
      SITE_URL + '/users', {
        headers: {
          "User": JSON.stringify(account)
        }
      }).pipe(tap(users => {
        console.log(users);
      }));
  }

  signIn(name: string, password: string): Observable<string | null> {
    const user = {
        name: name,
        password: password
      };

    return this.http
      .get<Account & { pictureUrl: string | null }>(`${SITE_URL}/verify`, {
        observe: 'response',
        headers: {
          "Content-Type": "application/json",
          "User": JSON.stringify(user)
        }
      })
      .pipe(
        // Assign _current if the status is OK
        tap((res) => {
          console.log(res.body);
          if (res.status == 200) {
            const newAccount = res.body as Account;
            
            this._current = of(newAccount);
            this.updatePictureUrl(res.body!.pictureUrl);
            
            const answers = new Map<number, string>();
            res.body?.answers.forEach(answer => answers.set(answer.qIndex, answer.choice));
            this._answers = of(answers);

            const creatureRates = new Map<number, number>();
            res.body?.usersToCreatureRates.forEach(rate => creatureRates.set(rate.ratedId, rate.creatureIndex));
            this._creatureRates = of(creatureRates);
            this._creatureRates.subscribe(console.log);

            const usersMap = new Map<number, User>();
            this.getUsers(newAccount).subscribe(users => {
              users?.forEach(user => {
                usersMap.set(user.id, user);
                if(user.id == newAccount.toGiftId)
                  this._ssRecipient = of(user);
              });

            this._users = of(usersMap);
            this.users.subscribe();
            });
          }
        }),
        // Retrieve the status the OK response, or Error response
        map((_res) => null),
        catchError(errRes => of(errRes.error))
      );
  }

  public updatePictureUrl(url: string | null) {
    if(url) {
      this._pictureUri = of(`${SITE_URL}/pictures/${url}`);
    } else {
      this._pictureUri = of(null);
    }
  }

  public get current(): Observable<Account | null> {
    return this._current;
  }

  public get pictureUri(): Observable<string | null> {
    return this._pictureUri;
  }

  public get answers(): Observable<Map<number, string> | null> {
    return this._answers;
  }

  public get users(): Observable<Map<number, User> | null> {
    return this._users;
  }

  public get creatureRates(): Observable<Map<number, number> | null> {
    return this._creatureRates;
  }

  public get secretSantaRecipient(): Observable<User | null> {
    return this._ssRecipient;
  }
}
