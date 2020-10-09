import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-briefing',
  templateUrl: './briefing.component.html',
  styleUrls: ['./briefing.component.scss']
})
export class BriefingComponent implements OnInit {
  public briefingForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(32)]),
    company: new FormControl('', [Validators.required,  Validators.maxLength(32)]),
    deadline: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required,  Validators.maxLength(350)])
  });
  selectedCategory: any[] = [];
  categories = [
    {
      description: 'Logotipo',
      id: '1'
    },
    {
      description: 'Branding',
      id: '2'
    },
    {
      description: 'Banner',
      id: '3'
    },
    {
      description: 'Mídia Social',
      id: '4'
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(value){

  }

  addCategory(category){
    if (this.selectedCategory.length <= 0){
      this.selectedCategory.push(category);
    } else {
      const exist = this.selectedCategory.findIndex(x => x.id === category.id);
      if (exist > -1) {
        this.selectedCategory.splice(exist, 1);
      } else {
        this.selectedCategory.push(category);
      }
    }
  }

  isSelected(id){
    const exist = this.selectedCategory.findIndex(x => x.id === id);
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

}
