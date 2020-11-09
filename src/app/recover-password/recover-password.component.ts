import { UserService } from './../_services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal, * as swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {
  public username = new FormControl('', Validators.required);
  constructor(
    private sUser: UserService
  ) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.username.value != ''){
      this.sUser.recoverPassword(this.username.value).subscribe(r => {
        Swal.fire({ title: '', text: r.message, icon: 'success'});
      }, e => {
        Swal.fire({ title: '', text: e, icon: 'error'});
      })
    } else {
      Swal.fire({ title: '', text: 'Insira um e-mail ou CPF/CNPJ.', icon: 'warning', timer: 2000});
    }
  }

}
