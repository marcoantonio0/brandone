import { MenuService } from './../../../_services/menu.service';
import { UserService, UserModel } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

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
  public userForm =  new FormGroup({
    name: new FormControl(''),
    cpfcnpj: new FormControl(''),
    email: new FormControl(''),
    roles: new FormControl('')
  });
  public allRoles = ['admin', 'user', 'customer'];
  constructor(
    private sUser: UserService,
    private route: ActivatedRoute,
    private sMenu: MenuService
  ) {
    this.route.params.subscribe(params => {
      if (params) {
        this.sUser.getById(params.id).subscribe(r => {
          this.userName = r.name;
          this.userCpfCnpj = r.cpfcnpj;
          this.userId = r._id;
          this.userMenu = r.menu;
          this.userSubmenu = r.submenu;
          this.userRoles = r.roles;
          this.setFormValues(r);
        });
      }

      this.sMenu.getMenu().subscribe(r => {
        this.menus = r;
      });
    });
  }


  setFormValues(value: UserModel){
    this.userForm.get('name').setValue(value.name);
    this.userForm.get('cpfcnpj').setValue(value.cpfcnpj);
    this.userForm.get('email').setValue(value.email);
    this.userForm.get('roles').setValue(value.roles);
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

  ngOnInit(): void {
  }

}
