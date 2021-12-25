import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-take-trivia',
  templateUrl: './take-trivia.component.html',
  styleUrls: ['./take-trivia.component.css']
})
export class TakeTriviaComponent implements OnInit {

  constructor(public triviaService: TriviaService) { }

  ngOnInit(): void {
  }

  public isChristmas() {
    return new Date().getDate() >= 25;
  }

}
