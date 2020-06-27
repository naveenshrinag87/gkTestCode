import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private _fb: FormBuilder, private _service: CommonService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    })

  }

  loginUser() {
    if (!this.loginForm.valid) {
      return;
    }

    this._service.loginUser(this.loginForm.value).subscribe(
      response => {
        if (response && response.key) {
          this._service.userKey = response.key;
          this._service.userName = `${response.firstName} ${response.lastName}`;
          this._router.navigate(['dashboard']);
        }else {
          this._snackBar.open('Invalid user name or password', 'error', {
            duration: 4000,
          });
        }
      }, error => {
        console.error('Could not log in');
      }
    )

  }

}
