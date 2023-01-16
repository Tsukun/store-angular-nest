import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-second-navbar',
  templateUrl: './second-navbar.component.html',
  styleUrls: ['./second-navbar.component.sass'],
})
export class SecondNavbarComponent {
  display: boolean = false;
  onPress() {
    this.display = !this.display;
  }
}
