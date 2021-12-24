import { Component, Input, OnInit } from '@angular/core';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-take-trivia',
  templateUrl: './take-trivia.component.html',
  styleUrls: ['./take-trivia.component.css']
})
export class TakeTriviaComponent implements OnInit {

  constructor(public triviaService: TriviaService) { }

  ngOnInit(): void {
    this.triviaService.getTrivia().subscribe();
    this.triviaService.trivia.subscribe(triv => console.log(triv));
  }

}
