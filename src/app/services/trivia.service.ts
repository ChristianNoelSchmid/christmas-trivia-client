import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of, Subject, tap } from 'rxjs';
import { SITE_URL } from '../constants';
import { Trivia } from '../models/trivia.interface';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TriviaService {
 
  private _trivia: Observable<Trivia | undefined> = of(undefined);

  constructor(private http: HttpClient, private account: AccountService) { }

  public postPicture(file: File): Observable<string | null> {
    // The returned error message. Null if no error occured
    let msg = new Subject<string | null>()

    this.account.current.subscribe(user => {
      // Add the uploaded picture to the form data
      const formData = new FormData();
      formData.append('picture', file);

      if(user != null) {
        // Post the request
        this.http
          .post<{ url: string }>(`${SITE_URL}/upload-picture`, formData, {
            observe: "response",
            headers: { 
              "User": JSON.stringify(user)
            }
          }).pipe(
            // If success, add the url to the user profile
            tap(res => { 
                this.account.updatePictureUrl(res.body!.url!)
            }),
            map(_ => msg.next(null)),
            // If error, return the error message
            catchError(errRes => { 
              msg.next(errRes.error); 
              return of(""); 
            })
          ).subscribe();
      } else {
        msg.next("Server error. Please try again later.");
      }
    });

    return msg.asObservable();
  }

  public postAnswer(index: number, answer: string): Observable<{ success: boolean, text: string }> {
    let msg = new Subject<{ success: boolean, text: string }>()

    this.account.current.subscribe(
      user => {
        if(user != null) {
          const data = {
            answer: {
              qIndex: index, 
              choice: answer
            }
          };

          this.http
            .post<string>(`${SITE_URL}/submit-answer`, data, { 
              observe: "response", 
              headers: { 
                "User": JSON.stringify(user)
              }
            }).pipe(
              map(_ => msg.next({ success: true, text: "Saved" })),
              catchError(errRes => { 
                msg.next({ success: false, text: errRes.error });
                return of("");
              })
            ).subscribe();
        } else {
          msg.next({ success: false, text: "Server error. Please try again later." });
        }
      }
    );

    return msg.asObservable();
    
  }

  public postCreatureChoice(userId: number, choice: number): Observable<{success: boolean, text: string}> {

    let msg = new Subject<{ success: boolean, text: string }>()

    this.account.current.subscribe(
      user => {
        if(user != null) {
          const data = {
              ratedId: userId, 
              creatureIndex: choice
          };

          this.http
            .post<string>(`${SITE_URL}/creature-rating`, data, { 
              observe: "response", 
              headers: { 
                "User": JSON.stringify(user)
              }
            }).pipe(
              map(_ => msg.next({ success: true, text: "Saved" })),
              catchError(errRes => { 
                msg.next({ success: false, text: errRes.error });
                return of("");
              })
            ).subscribe();
        } else {
          msg.next({ success: false, text: "Server error. Please try again later." });
        }
      }
    );

    return msg.asObservable();

  }

  public postSecretSantaGift(gift: string): Observable<{success: boolean, text: string}> {
    let msg = new Subject<{ success: boolean, text: string }>()

    this.account.current.subscribe(
      user => {
        if(user != null) {
          const data = {
            gift
          };

          this.http
            .post<string>(`${SITE_URL}/secret-santa-gift`, data, { 
              observe: "response", 
              headers: { 
                "User": JSON.stringify(user)
              }
            }).pipe(
              map(_ => msg.next({ success: true, text: "Saved" })),
              catchError(errRes => { 
                msg.next({ success: false, text: errRes.error });
                return of("");
              })
            ).subscribe();
        } else {
          msg.next({ success: false, text: "Server error. Please try again later." });
        }
      }
    );

    return msg.asObservable();

  }

  public getTrivia(): Observable<string | null> {
    const msg = new Subject<string | null>();

    this.account.current.subscribe(account => {
    this.http.get<Trivia>(SITE_URL + "/get-trivia", {
      headers: {
        "User": JSON.stringify(account)
      }
    }).pipe(
        tap(trivia => this._trivia = of(trivia)),
        map(_ => undefined),
        catchError(err => { msg.next(err.error); return of(undefined); })
      ).subscribe();
    });

    return msg.asObservable();
  }

  public get trivia(): Observable<Trivia | undefined> {
    return this._trivia;
  }
}
