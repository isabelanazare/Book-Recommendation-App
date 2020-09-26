import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User = null;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    let userId = window.localStorage.getItem("userId");
    let name = window.localStorage.getItem("username");
    if (userId !== null && name !== null) {
      this.user = {
        username: name,
        id: userId,
        email: null
      }
    }
  }

  public logOut() {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("userKey");
    this.user = null;
    this.router.navigate(['/']);
  }
}
