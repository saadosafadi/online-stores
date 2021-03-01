import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { DataService } from '../../data.service';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dataService: DataService) { }

  invalid = false;
  loginFaild = false;
  user: any = {};

  ngOnInit() {
  }
  login() {if (
      this.validateID() &&
      this.user.password && this.user.password.length >= 4
    ) {
      this.invalid = false;
      this.dataService.login({user: {...this.user,
          password: Md5.hashStr(this.user.password)}
      }).subscribe(res => {
        if (res.json().success == true) {
          const newUrl = res.json().toUrl;
          window.location.href = newUrl;
        } else {
          this.loginFaild = true;
        }
      },
        err => this.loginFaild = true
        );
    } else {
      this.invalid = true;
    }
  }
  validateID() {
    return true;
  }
}

