import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User = new User();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      
    }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
}

}
