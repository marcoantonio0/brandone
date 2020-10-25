import { CategoryService } from './../../../_services/category.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  categories: any;
  public order;
  public languages;
  public archives;
  public customer;
  public user;
  public orderForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl([]),
    deadline: new FormControl(''),
    archive: new FormControl(''),
    language: new FormControl(''),
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sOrder: OrderService,
    private sCategory: CategoryService
  ) {

    this.sCategory.getAll().subscribe(r => {
      this.categories = r;
    });

    this.sOrder.getAllArchives().subscribe(r => {
      this.archives = r;
    });

    this.sOrder.getAllLanguage().subscribe(r => {
      this.languages = r;
    });

    this.route.params.subscribe(params => {
      if(Object.keys(params).length > 0) {
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
    const index = categories.findIndex(x => x._id === category._id);
    if(index >= 0){
      categories.splice(index, 1);
      this.orderForm.get('category').setValue(categories);
    }
  }

  languageRemove(language) {
    const languages = this.orderForm.get('language').value;
    const index = languages.findIndex(x => x._id === language._id);
    if(index >= 0){
      languages.splice(index, 1);
      this.orderForm.get('language').setValue(languages);
    }
  }

  archiveRemove(archive) {
    const archives = this.orderForm.get('archive').value;
    const index = archives.findIndex(x => x._id === archive._id);
    if(index >= 0){
      archives.splice(index, 1);
      this.orderForm.get('archive').setValue(archives);
    }
  }

  ngOnInit(): void {

  }

  isSelected(id){
    const index = this.orderForm.get('category').value.findIndex(x => x._id === id);
    if(index >= 0){
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

  setFormValue(infos){
    this.orderForm.get('title').setValue(infos.title);
    this.orderForm.get('description').setValue(infos.description);
    this.orderForm.get('category').setValue(this.getValueCategory(infos.category));
    this.orderForm.get('deadline').setValue(infos.deadline);
    this.orderForm.get('archive').setValue(this.getValue(infos.archive));
    this.orderForm.get('language').setValue(this.getValue(infos.language));
  }


}
