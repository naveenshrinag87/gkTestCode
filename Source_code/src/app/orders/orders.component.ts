import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersData: Observable<any>;

  constructor(private _service: CommonService) { }

  ngOnInit() {
    this.ordersData = this._service.getCustomerOrdersDetails();
    // this._service.getCustomerOrdersDetails().subscribe(
    //   data => {
        
    //   }
    // )
  }

}
