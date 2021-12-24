import { Component, Input, OnInit } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { Question } from '../../models/question.interface';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() question?: Question;
  @Input() public choiceText: string = "";

  public loading = false;
  public messageText: string | null = null;
  public messageColor: string = "red";
  
  private postIndex = 0;

  constructor(private trivia: TriviaService) {}

  ngOnInit(): void {}

  public onAnswerChange(choice: string | null = this.choiceText) {
    if(choice != null) {
      // If it's a choice type, immediately apply
      if(this.question?.type == "choice") {
        this.postChoice(choice);

      // If it's a word type, wait 1 second before posting to the server
      // in case the user isn't finished changing it.
      } else { 
        this.postIndex += 1;
        const currentIndex = this.postIndex;

        setTimeout(() => {
          if(currentIndex == this.postIndex)
            this.postChoice(choice);
        }, 1000);
      }
    }
  }

  private postChoice(choice: string) {
    this.loading = true;

    this.trivia.postAnswer(this.question!.index, choice)
      .subscribe(res => {
        console.log(res);

        this.messageColor = res.success ? "green" : "red";
        this.messageText = res.text;

        if(res.success && this.question?.type == "choice") {
          this.choiceText = choice;
        }

        this.loading = false;
      });
  }
}
