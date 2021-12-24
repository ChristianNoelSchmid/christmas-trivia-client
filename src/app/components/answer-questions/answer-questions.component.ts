import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../models/question.interface';
import { importJsonArray } from '../../import';
import * as questionCardList from '../../../assets/questionCardList.json';
import { AccountService } from '../../services/account.service';
import { TriviaService } from '../../services/trivia.service';
import { Observable, Subject } from 'rxjs';
import { Answer } from '../../models/answer.interface';
import { User } from 'src/app/models/user.interface';
import { QUESTION_COUNT } from 'src/app/constants';

@Component({
  selector: 'app-answer-questions',
  templateUrl: './answer-questions.component.html',
  styleUrls: ['./answer-questions.component.css'],
})
export class AnswerQuestionsComponent implements OnInit {

  public questions: Question[] = importJsonArray(questionCardList);
  public creatureQuestions: Question[] = [];
  public errorMessage: string | null = null;
  public loading = false;
  
  private postIndex = 0;

  public secretSantaGift: string = "";
  public messageColor = "green";
  public messageText = "";

  constructor(public account: AccountService, private trivia: TriviaService) {}

  ngOnInit(): void {
    this.account.current.subscribe(account => {
      this.secretSantaGift = account?.secretSantaGift ?? "";
    });
  }

  public onPictureChanged(event: any) {
    this.loading = true;
    this.trivia.postPicture(event.target?.files[0])
        .subscribe(result => {
          this.loading = false;
          this.errorMessage = result
        });
  }

  public loadAnswer(question: Question): Observable<Answer | null> {
    let answer = new Subject<Answer | null>();

    this.account.current.subscribe(
      user => {
        const ans = user?.answers?.find(a => a.qIndex == question.index) ?? null;
        if(ans != null) answer.next(ans);
        else answer.next(null);
      }
    )

    return answer.asObservable();
  } 

  public onAnswerChange() {
        this.postIndex += 1;
        const currentIndex = this.postIndex;

        setTimeout(() => {
          if(currentIndex == this.postIndex)
            this.postChoice();
        }, 1000);
    }

  private postChoice() {
    this.loading = true;

    this.trivia.postSecretSantaGift(this.secretSantaGift)
      .subscribe(res => {
        console.log(res);

        this.messageColor = res.success ? "green" : "red";
        this.messageText = res.text;

        this.loading = false;
      });
  }
}
