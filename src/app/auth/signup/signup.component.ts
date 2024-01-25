import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  @ViewChild('form') signupForm: NgForm;
  maxDate: Date;
  constructor(private authService: AuthService) {}
  isPasswordVisible = 'visibility';

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit() {
    this.authService.signUp({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    });
  }

  toggleVisibility(createPassword: HTMLInputElement) {
    if (createPassword.type === 'password') {
      createPassword.type = 'text';
      this.isPasswordVisible = 'visibility_off';
    } else {
      createPassword.type = 'password';
      this.isPasswordVisible = 'visibility';
    }
  }
}
