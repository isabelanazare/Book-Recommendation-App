import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY_STRING } from 'src/app/utils/constants';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private checkoutForm: FormGroup;
  public user: User = null;
  public loading: boolean = false;
  public submitted: boolean = false;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.checkoutForm = this.formBuilder.group({
      email: EMPTY_STRING,
      password: EMPTY_STRING
    });
  }

  ngOnInit(): void {
  }

  getCheckoutForm() {
    return this.checkoutForm;
  }

  public login() {
    let formData = this.getCheckoutForm().value;

    if (formData.email !== EMPTY_STRING && formData.password !== EMPTY_STRING) {

      this.userService.getUserByEmailAndPassword(formData.email, formData.password).subscribe(
        response => {
          if (response.message !== null) {
            this.user = response.message;
            window.localStorage.setItem("userId", response.message.user_id.toString());
            window.localStorage.setItem("username", this.user.username);
            window.localStorage.setItem("userKey", this.user.id);
            this.router.navigate(['/main']);
          }
          else {
            this.alertService.alertError("Wrong credentials");
            this.checkoutForm.reset();
          }
        }
      );
    }
    else this.alertService.alertError("Please enter email and password");
  }
}
