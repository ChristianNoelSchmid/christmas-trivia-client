import { Component, Input, OnInit } from '@angular/core';
import { SITE_URL } from 'src/app/constants';
import { importJsonArray } from 'src/app/import';
import { Question } from 'src/app/models/question.interface';
import { TriviaQuestion } from 'src/app/models/trivia.interface';
import * as questionCardList from "../../../assets/questionCardList.json";

@Component({
  selector: 'app-trivia-card',
  templateUrl: './trivia-card.component.html',
  styleUrls: ['./trivia-card.component.css']
})
export class TriviaCardComponent implements OnInit {

  @Input() public question?: TriviaQuestion;
  public questions: Question[] = importJsonArray(questionCardList);

  public answered = false;
  public answeredCorrectly = false;

  constructor() { }

  pictureUrl() {
    return `${SITE_URL}/pictures/${this.question?.questionerPictureUri}`;
  }

  ngOnInit(): void {
    
  }

  tryAnswer(index: number) {
    this.answered = true;
    this.answeredCorrectly = index == this.question?.answerIndex;
  }

}
