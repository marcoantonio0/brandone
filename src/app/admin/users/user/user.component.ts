import { MenuService } from './../../../_services/menu.service';
import { UserService, UserModel } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userName;
  public userCpfCnpj;
  public userId;
  public userSubmenu;
  public userMenu;
  public menus;
  public submenu;
  public userRoles;
  public userUpdated;
  public userCreated;
  public isLoading = false;
  public userForm =  new FormGroup({
    name: new FormControl('', Validators.required),
    cpfcnpj: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    roles: new FormControl('', Validators.required),
    razao_social: new FormControl(''),
    phone: new FormControl('', Validators.required),
    birthday: new FormControl('',  Validators.required)
  });
  public allRoles = ['admin', 'user', 'customer'];
  constructor(
    private sUser: UserService,
    private route: ActivatedRoute,
    private sMenu: MenuService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length != 0) {
        this.sUser.getById(params.id).subscribe(r => {
          this.userName = r.name;
          this.userCpfCnpj = r.cpfcnpj;
          this.userId = r._id;
          this.userMenu = r.menu;
          this.userSubmenu = r.submenu;
          this.userRoles = r.roles;
          this.userUpdated = r.updatedAt;
          this.userCreated = r.createdAt;
          this.setFormValues(r);
        }, e => {
          this.router.navigate(['/admin/users']);
        });
      } else {
        this.router.navigate(['/admin/users']);
      }

      this.sMenu.getMenu().subscribe(r => {
        this.menus = r;
      }, e => {
        this.router.navigate(['/admin/users']);
      });
    });
  }

  formatDate(value){
    const split: string[] = value.split('-');
    return `${split[0]}-${split[1]}-${split[2].substring(0, 2)}`;
  }

  setFormValues(value: UserModel){
    this.userForm.get('name').setValue(value.name);
    this.userForm.get('cpfcnpj').setValue(value.cpfcnpj);
    this.userForm.get('email').setValue(value.email);
    this.userForm.get('roles').setValue(value.roles);
    this.userForm.get('razao_social').setValue(value.razao_social);
    this.userForm.get('birthday').setValue(this.formatDate(value.birthday));
  }

  submit(){
    this.isLoading = true;
    this.sUser.updateById(this.userId, this.userForm.value).subscribe(r => {
      this.isLoading = false;
      console.log('edited');
    })
  }

  setMenu(id){
    this.sMenu.setUserMenu(this.userId, id).subscribe(r => {
      const index = this.userMenu.findIndex(x => x._id === id);
      const indexMenu = this.menus.findIndex(x => x._id === id);
      if(index > -1){
        this.userMenu.splice(index, 1);
      } else {
        this.userMenu.push(this.menus[indexMenu]);
      }
    });
  }

  setSubMenu(id){
    this.sMenu.setUserSubMenu(this.userId, id).subscribe(r => {
      console.log('add');
    })
  }

  hasPermission(id: string[], type?: string){
    if (type){
      if (this.userSubmenu.findIndex(x => x === id) > -1) { return true; }
      else { return false; }
    } else {
      if (this.userMenu.findIndex(x => x._id === id) > -1) { return true; }
      else { return false; }
    }
  }

  back(){
    this.router.navigate(['/admin/users']);
  }

  ngOnInit(): void {
  }

}
