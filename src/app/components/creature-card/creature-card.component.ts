import { Component, Input, OnInit } from '@angular/core';
import { ImageText } from 'src/app/models/image-text.interface';
import { User } from 'src/app/models/user.interface';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-creature-card',
  templateUrl: './creature-card.component.html',
  styleUrls: ['./creature-card.component.css']
})
export class CreatureCardComponent implements OnInit {

  public buttonData: ImageText[] = [{
    imageSrc: "",
    text: "A bubbly, cheerful elf",
  }, {
    imageSrc: "",
    text: "A hard-working reindeer",
  }, {
    imageSrc: "",
    text: "A super sweet gingerbread person"
  }, {
    imageSrc: "",
    text: "A cool, chill snowman"
  }];

  @Input() public user: User | null = null;
  @Input() public choiceIndex: number = -1;

  public loading: boolean = false;
  public messageText: string | null = null;
  public messageColor: string = "red";

  constructor(private trivia: TriviaService) { }

  ngOnInit(): void { }

  onAnswerChange(userId: number, index: number) {
    this.loading = true;

    this.trivia.postCreatureChoice(userId, index)
      .subscribe(res => {
        console.log(res);

        this.messageColor = res.success ? "green" : "red";
        this.messageText = res.text;

        if(res.success) {
          this.choiceIndex = index;
        }

        this.loading = false;
      });
  }

}
