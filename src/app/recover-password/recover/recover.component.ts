import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal, * as swal from 'sweetalert2';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  public passwordForm = new FormGroup({
    password: new FormControl('', Validators.required),
    second_password: new FormControl('', Validators.required)
  });
  private token: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sUser: UserService
  ) {
    this.route.params.subscribe(params => {
      console.log(params);
      if(Object.keys(params).length > 0){
        this.sUser.checkTokenPassword(params.token).subscribe(r => {
          this.token = params.token;
        }, e => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  submit(){
    const json = {
      token: this.token,
      password: this.passwordForm.value.password
    };
    if(!this.passwordForm.invalid){
      this.sUser.changePassword(json).subscribe(r => {
        Swal.fire({ title: '', text: r.message, icon: 'success' });
      }, e => {
        Swal.fire({ title: '', text: e, icon: 'error' });
      });
    }
  }

}
