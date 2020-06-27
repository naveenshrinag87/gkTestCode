import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() header:string;
  @Input() showBackBtn:boolean;
  @Input() showUserInfo:boolean;
  userName:string;
  constructor(private _commonService: CommonService, private _router: Router) { }

  ngOnInit() {
    this.userName = this._commonService.userName;
  }

  logout() {
    this._commonService.logOutUser().subscribe(
      resData => {
        localStorage.clear();
        this._router.navigate(['login']);
      }
    )
  }

}
