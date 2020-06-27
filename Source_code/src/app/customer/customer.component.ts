import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  constructor(private _service: CommonService, private _fb: FormBuilder, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.customerForm = this._fb.group({
      customerName: [null, Validators.required],
      customerAge: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      customerAddress: [null, Validators.required]
    })
  }

  saveCustomerDetails() {
    if(!this.customerForm.valid) {
      return;
    }

    this._service.saveCustomerDetails(this.customerForm.value).subscribe(
      resData => {
        this._snackBar.open('Details saved successfully', 'Success', {
          duration: 4000,
        });
        this.customerForm.reset();
      }, error => {
        this._snackBar.open('Details could not be saved', 'Error', {
          duration: 4000,
        });
      }
    )
  }

  cancel() {
    this._router.navigate(['/dashboard']);
  }

}
