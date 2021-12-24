import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from 'src/app/services/trivia.service';
import { SITE_URL } from 'src/app/constants';

@Component({
  selector: 'app-trivia-slider',
  templateUrl: './trivia-slider.component.html',
  styleUrls: ['./trivia-slider.component.css']
})
export class TriviaSliderComponent implements OnInit, AfterViewInit {

  public cardIndex = 0;
  public SITE_URL = SITE_URL;

  constructor(public triviaService: TriviaService, private router: Router) { }

  ngOnInit(): void {}

  ngAfterViewInit() { 
    setInterval(() => window.scrollTo({ left: 0 }), 10);
    setTimeout(() => {
      const cards = document.querySelectorAll('.slider > *');

      cards.forEach((card, index) => {

        if(index != 0) {
          const back = document.createElement('div');
          back.className = 'back-button';
          back.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>`;
          back.addEventListener('click', () => this.goBackward());

          card.append(back);
        }

        if(index != cards.length - 1) {
          const forward = document.createElement('div');
          forward.className = 'forward-button';
          forward.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>`;
          forward.addEventListener('click', () => this.goForward()); 

          card.append(forward);
        }
      });
    }, 100);
  }

  goForward() {
    this.cardIndex += 1;
  }

  goBackward() {
    this.cardIndex -= 1;
  }

  screenWidth() {
    return window.innerWidth;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }
}
