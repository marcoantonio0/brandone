import { BudgetDialogComponent } from '../../dialogs/budget/budgetdialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../../_services/user.service';
import { CategoryService } from './../../../_services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  editTitle = false;
  categories: any;
  public order;
  public languages;
  public archives;
  public customer;
  public status;
  public user;
  private orderId: string;
  public freelancers;
  public isLoading = false;
  public orderForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl([]),
    deadline: new FormControl(''),
    archive: new FormControl(''),
    language: new FormControl(''),
    freelancer: new FormControl(''),
    price: new FormControl({value: '', disabled: true}),
    status: new FormControl()
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sOrder: OrderService,
    private sCategory: CategoryService,
    private sUser: UserService,
    private snack: MatSnackBar,
    public dialog: MatDialog
  ) {



    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
          this.sCategory.getAll().subscribe(r => {
            this.categories = r;
          });

          this.sOrder.getAllArchives().subscribe(r => {
            this.archives = r;
          });

          this.sOrder.getAllLanguage().subscribe(r => {
            this.languages = r;
          });

          this.sUser.getAllUsers().subscribe(r => {
            this.freelancers = r;
          });

          this.sOrder.getAllStatus().subscribe(r => {
            this.status = r;
          });


          this.orderId = params.id;
          this.sOrder.getOrderById(params.id).subscribe(r => {
            this.order = r;
            this.customer = r.customer;
            this.user = r.user;
            this.setFormValue(r);
          }, e => {
            this.router.navigate(['/admin/orders']);
          });
      } else {
        this.router.navigate(['/admin/orders']);
      }
    });
  }

  categoryRemove(category) {
    const categories = this.orderForm.get('category').value;
    const index = categories.findIndex(x => x === category);
    if (index >= 0){
      categories.splice(index, 1);
      this.orderForm.get('category').setValue(categories);
    }
  }

  getOrder(){
    this.sOrder.getOrderById(this.orderId).subscribe(r => {
      this.order = r;
      this.customer = r.customer;
      this.user = r.user;
      this.setFormValue(r);
    }, e => {
      this.router.navigate(['/admin/orders']);
    });
  }

  languageRemove(language) {
    const languages = this.orderForm.get('language').value;
    const index = languages.findIndex(x => x === language);
    if (index >= 0){
      languages.splice(index, 1);
      this.orderForm.get('language').setValue(languages);
    }
  }

  statusRemove(status) {
    const statusCtrl = this.orderForm.get('status').value;
    const index = statusCtrl.findIndex(x => x === status);
    if (index >= 0){
      statusCtrl.splice(index, 1);
      this.orderForm.get('status').setValue(statusCtrl);
    }
  }

  archiveRemove(archive) {
    const archives = this.orderForm.get('archive').value;
    const index = archives.findIndex(x => x === archive);
    if (index >= 0){
      archives.splice(index, 1);
      this.orderForm.get('archive').setValue(archives);
    }
  }

  ngOnInit(): void {

  }

  isSelected(id){
    const index = this.orderForm.get('category').value.findIndex(x => x._id === id);
    if (index >= 0){
      return true;
    } else {
      return false;
    }
  }

  getValueCategory(array){
    const categories = [];
    for (const category of array) {
      categories.push(category.description);
    }
    return categories;
  }

  getValue(array){
    const archives = [];
    for (const archive of array) {
      archives.push(archive.type);
    }
    return archives;
  }

  getValueStatus(array){
    const status = [];
    for (const stats of array) {
      status.push(stats.description);
    }
    return status;
  }

  setFormValue(infos){
    this.orderForm.get('title').setValue(infos.title);
    this.orderForm.get('description').setValue(infos.description);
    this.orderForm.get('category').setValue(this.getValueCategory(infos.category));
    this.orderForm.get('deadline').setValue(infos.deadline);
    this.orderForm.get('archive').setValue(this.getValue(infos.archive));
    this.orderForm.get('language').setValue(this.getValue(infos.language_program));
    this.orderForm.get('freelancer').setValue(infos.user.name);
    this.orderForm.get('price').setValue(infos.price);
    this.orderForm.get('status').setValue(this.getValueStatus(infos.status));
  }

  getSelectedFreelancer(){
    const lancer = this.orderForm.get('freelancer').value;
    for (const freelancer of this.freelancers) {
      if (freelancer.name === lancer){
        return freelancer;
      }
    }
  }

  getCategoryIds(){
    const categoriesFiltered = [];
    const categoriesString = this.orderForm.get('category').value;
    for (const category of categoriesString) {
      const index = this.categories.findIndex(x => x.description === category);
      if (index >= 0){
        categoriesFiltered.push(this.categories[index]._id);
      }
    }
    return categoriesFiltered;
  }

  getArchivesIds(){
    const archivesFiltered = [];
    const archivesString = this.orderForm.get('archive').value;
    for (const archive of archivesString) {
      const index = this.archives.findIndex(x => x.type === archive);
      if (index >= 0){
        archivesFiltered.push(this.archives[index]._id);
      }
    }
    return archivesFiltered;
  }

  getLastStatus(){
    return this.order.status[this.order.status.length-1];
  }

  getLanguageIds(){
    const languagesFiltered = [];
    const languagesString = this.orderForm.get('language').value;
    for (const language of languagesString) {
      const index = this.languages.findIndex(x => x.type === language);
      if (index >= 0){
        languagesFiltered.push(this.languages[index]._id);
      }
    }
    return languagesFiltered;
  }

  getStatusIds(){
    const statusFiltered = [];
    const statusString = this.orderForm.get('status').value;
    for (const status of statusString) {
      const index = this.status.findIndex(x => x.description === status);
      if (index >= 0){
        statusFiltered.push(this.status[index]._id);
      }
    }
    return statusFiltered;
  }

  getFreelancer(){
    const index = this.freelancers.findIndex(x => x.name === this.orderForm.get('freelancer').value);
    if (index >= 0) {
      return this.freelancers[index]._id;
    }
  }

  checkCategory(){
    const categories: string[] = [];
    for (const category of this.order.category) {
      categories.push(category.description);
    }
    return categories;
  }

  checkArchive(){
    const archives: string[] = [];
    for (const archive of this.order.archive) {
      archives.push(archive.type);
    }
    return archives;
  }

  checkLanguage(){
    const languages: string[] = [];
    for (const language of this.order.language_program) {
      languages.push(language.type);
    }
    return languages;
  }

  checkStatus(){
    const status: string[] = [];
    for (const stats of this.order.status) {
      status.push(stats.description);
    }
    return status;
  }

  JSONSubmit(){
    let json = {};
    if (this.orderForm.value.title !== this.order.title) {
      json['title'] = this.orderForm.value.title;
    }
    if (this.orderForm.value.description !== this.order.description) {
      json['description'] = this.orderForm.value.description;
    }
    if (this.orderForm.value.price !== this.order.price) {
      json['price'] = this.orderForm.value.price;
    }
    if (this.getFreelancer() !== this.order.user._id) {
      json['user'] = this.getFreelancer();
    }
    if (JSON.stringify(this.orderForm.value.category) !== JSON.stringify(this.checkCategory())) {
      json['category'] = this.getCategoryIds();
    }
    if (JSON.stringify(this.orderForm.value.archive) !== JSON.stringify(this.checkArchive())) {
      json['archive'] = this.getArchivesIds();
    }
    if (JSON.stringify(this.orderForm.value.language) !== JSON.stringify(this.checkLanguage())) {
      json['language_program'] = this.getLanguageIds();
    }
    if (JSON.stringify(this.orderForm.value.status) !== JSON.stringify(this.checkStatus())) {
      json['status'] = this.getStatusIds();
    }
    return json;
  }


OnSubmit(){
    if(Object.keys(this.JSONSubmit()).length > 0) {
      this.isLoading = true;
      this.sOrder.update(this.orderId, this.JSONSubmit()).subscribe(r => {
        this.isLoading = false;
        this.snack.open('Atualizado com sucesso!', 'OK', { duration: 2000 });
      }, e => {
        this.isLoading = false;
        console.log(e);
      });
    } else {
      this.snack.open('Nenhuma alteração detectada', 'OK', { duration: 2000 });
    }
  }


cancel(){
    this.setFormValue(this.order);
  }

  getColorStatus(id){
    if(id == 1){
      return 'var(--blue)';
    }
    if(id == 2){
      return 'var(--blue)';
    }
    if(id == 3){
      return 'var(--blue)';
    }
    if(id == 4){
      return 'var(--blue)';
    }
    if(id == 5){
      return 'var(--blue)';
    }
    if(id == 6){
      return 'var(--green)';
    }
    if(id == 7){
      return 'var(--red)';
    }
  }

  openBudget(){
   const dialog =  this.dialog.open(BudgetDialogComponent, {
      data: {
        title: this.order.title,
        id: this.order.id,
        freelancers: this.freelancers,
        price: this.order.price,
        commission: this.order.commission
      },
      width: '450px'
    });
   dialog.beforeClosed().subscribe(r => {
      if (r) {
        this.getOrder();
      }
    });
  }

}
