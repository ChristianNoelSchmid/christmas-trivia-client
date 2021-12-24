import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerQuestionsComponent } from './components/answer-questions/answer-questions.component';
import { CompletedAnswersComponent } from './components/completed-answers/completed-answers.component';
import { TakeTriviaComponent } from './components/take-trivia/take-trivia.component';

const routes: Routes = [
  {
    path: '',
    component: AnswerQuestionsComponent
  },
  {
    path: 'take-trivia',
    component: TakeTriviaComponent
  },
  {
    path: 'thanks',
    component: CompletedAnswersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
