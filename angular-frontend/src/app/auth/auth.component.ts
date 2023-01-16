import { AuthService } from './auth.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  constructor(private authService: AuthService) {}
  onPress() {
    this.display = !this.display;
    this.displayChange.emit(this.display);
  }
  login(email: string, password: string) {
    console.log(email);
    this.authService.login(email, password);
  }
}
