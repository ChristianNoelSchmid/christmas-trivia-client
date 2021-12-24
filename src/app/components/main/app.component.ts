import { Component, Input } from '@angular/core';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Christmas Trivia';

  @Input() public name: string = '';
  @Input() public password: string = '';

  public loading = false;
  public errorMessage = '';

  constructor(public accounts: AccountService) {}

  onSubmit(event: Event) {
    event.preventDefault();

    this.loading = true;
    this.accounts.signIn(this.name, this.password).subscribe((result) => {
      this.loading = false;
      this.errorMessage = result ?? "";
    });
  }
}
