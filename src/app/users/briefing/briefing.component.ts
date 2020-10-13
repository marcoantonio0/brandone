import { Router } from '@angular/router';
import { OrderService } from './../../_services/order.service';
import { CategoryService } from './../../_services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-briefing',
  templateUrl: './briefing.component.html',
  styleUrls: ['./briefing.component.scss']
})
export class BriefingComponent implements OnInit {
  public briefingForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(128)]),
    company: new FormControl('', [Validators.required,  Validators.maxLength(32)]),
    deadline: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(350)]),
    category: new FormControl('', Validators.required)
  });
  images = [];
  selectedCategory: any[] = [];
  categories: any;
  constructor(
    private sCategory: CategoryService,
    private sOrder: OrderService,
    private route: Router
  ) {
    this.sCategory.getAll().subscribe(r => {
      this.categories = r;
    });
  }

  ngOnInit(): void {
  }

  getCategories(){
    const categories = [];
    for (const category of this.categories) {
      categories.push(category._id);
    };
    return categories;
  }

  onSubmit(value){
    value.category = this.getCategories();
    console.log(value);
    this.sOrder.create(value).subscribe(r => {
      alert(r);
      this.route.navigate(['/user/obrigado']);
    }, e => {
      alert(e);
    });
  }

  addCategory(category){
    if (this.selectedCategory.length <= 0){
      this.selectedCategory.push(category);
    } else {
      const exist = this.selectedCategory.findIndex(x => x._id === category._id);
      if (exist > -1) {
        this.selectedCategory.splice(exist, 1);
      } else {
        this.selectedCategory.push(category);
      }
    }
  }

  isSelected(id){
    const exist = this.selectedCategory.findIndex(x => x._id === id);
    if(exist > -1) return true;
    else return false;
  }

  hiddenCat(){
    document.querySelector('.select-overlay').classList.remove('show');
    document.querySelector('.select-wrapper').classList.remove('show');
  }

  activeDrop(el: HTMLDivElement){
    console.log(el);
    if (!el.parentElement.classList.contains('show')){
      el.parentElement.classList.add('show');
      el.parentElement.querySelector('.select-overlay').classList.add('show');
    } else {
      el.parentElement.classList.remove('show');
      el.parentElement.querySelector('.select-overlay').classList.remove('show');
    }
  }

  getError(formcontrolname: string){
    const form = this.briefingForm.controls[formcontrolname];
    if(form.invalid && (form.dirty || form.touched)){
      if (form.errors?.required) {
        return 'Este campo é requirido.';
      }
      if (form.errors?.minlength) {
        return `Minímo ${form.errors.minlength.requiredLength} caracteres.`;
      }
      if (form.errors?.maxlength) {
        return `Maximo ${form.errors.maxlength.requiredLength} caracteres.`;
      }
    }
  }

  fileChange(files){
    for (let i = 0; i < files.length; i++) {
      const render = new FileReader();
      const file = files.item(i);
      render.onload = () => {
        this.images.push({
          name: file.name,
          url: render.result
        });
      };
      if (file) {
        render.readAsDataURL(file);
      }
    }
  }

  removeImage(index){
    this.images.splice(index, 1);
  }

}
