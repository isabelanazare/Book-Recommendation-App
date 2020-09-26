import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { EMPTY_STRING } from 'src/app/utils/constants';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private checkoutForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.checkoutForm = this.formBuilder.group({
      username: EMPTY_STRING,
      email: EMPTY_STRING,
      password: EMPTY_STRING,
      confirmedPassword: EMPTY_STRING
    });
  }

  ngOnInit(): void {
  }

  public getCheckoutForm() {
    return this.checkoutForm;
  }

  private _getUserDataFromForm(formData): User {

    if (formData.username !== EMPTY_STRING && formData.email !== EMPTY_STRING && formData.password !== EMPTY_STRING && formData.confirmedPassword !== EMPTY_STRING) {
      if (formData.password === formData.confirmedPassword) {
        this.alertService.alertSuccess("Registration complete");
        return new User(
          formData.username,
          formData.email,
          formData.password
        );
      }
      else { this.alertService.alertError("Confirm password doesn't match password"); }
    }
    else this.alertService.alertError("You have to enter data");
  }

  public onCreate() {
    let formData = this.getCheckoutForm().value;
    let user = this._getUserDataFromForm(formData);

    if (user !== null) {
      this.userService.addUser(user)
        .subscribe(() => {
          this.alertService.alertSuccess("Account created successfully!");
          this.router.navigate(['/login']);
        });
    }
    else {
      this.alertService.alertError("Wrong input");
    }
  }
}