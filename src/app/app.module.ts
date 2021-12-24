import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/main/app.component';
import { AnswerQuestionsComponent } from './components/answer-questions/answer-questions.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/question-card/question-card.component';
import { FormsModule } from '@angular/forms';
import { TakeTriviaComponent } from './components/take-trivia/take-trivia.component';
import { CompletedAnswersComponent } from './components/completed-answers/completed-answers.component';
import { CreatureCardComponent } from './components/creature-card/creature-card.component';
import { TriviaSliderComponent } from './components/trivia-slider/trivia-slider.component';
import { TriviaCardComponent } from './components/trivia-card/trivia-card.component';
import { CreatureChartComponent } from './components/creature-chart/creature-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    AnswerQuestionsComponent,
    TakeTriviaComponent,
    CompletedAnswersComponent,
    CreatureCardComponent,
    TriviaSliderComponent,
    TriviaCardComponent,
    CreatureChartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
