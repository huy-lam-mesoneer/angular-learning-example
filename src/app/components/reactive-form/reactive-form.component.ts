import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit {
  // How to create a form control
  // 1. By class FormControl
  name1 = new FormControl('');
  // 2. By formBuilder
  name2 = this.formBuilder.control('');

  // How to create a form group 
  // 1. By class FormGroup
  group1 = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(23),
  });
  // 2. By formBuilder
  group2 = this.formBuilder.group({
    name: '',
    age: 23
  })

  // How to create a form array
  // 1. By class FormArray
  skills = new FormArray([]);
  // 2. By FormBuilder
  lessonControls = this.formBuilder.array([
    this.formBuilder.control(''),
    this.formBuilder.control('')
  ])

  reactiveForm = new FormGroup({
    name: new FormControl('Huy'),
    id: new FormControl('2as3'),
    company: new FormControl({ value: 'ABC', disabled: true }),
    email: new FormControl({ value: 'huylam@meso.io', disabled: true })
  });

  tagsForm = this.formBuilder.group({
    webSite: this.formBuilder.control(''),
    tags: this.formBuilder.array([
      this.formBuilder.group({
        technology: this.formBuilder.control(''),
        nb_tutorials: this.formBuilder.control(''),
      }),
      this.formBuilder.group({
        technology: this.formBuilder.control(''),
        nb_tutorials: this.formBuilder.control(''),
      })
    ]),
  });

  constructor(private formBuilder: FormBuilder) {

  }

  get lessons(): FormControl[] {
    return this.lessonControls.controls as FormControl[]
  }

  // set FormControl value
  setWebsiteValue(): void {
    const website = 'XperTuto';
    this.tagsForm.get('webSite')?.setValue(website);
  }

  // set FormGroup value
  setTagsFormValue(): void {
    const tagsFormGroupValues = {
      webSite: 'www.XperTuto.com',
      tags: [
        {
          technology: 'Angular',
          nb_tutorials: '100',
        },
        {
          technology: 'NodeJs',
          nb_tutorials: '100',
        }
      ]
    }
  
    this.tagsForm.setValue(tagsFormGroupValues);
  }

  // set FormArray value
  setTagsValue(): void {
    const tagsFormArrayValues = [
      {
        technology: 'Java',
        nb_tutorials: '200',
      },
      {
        technology: 'Golang',
        nb_tutorials: '100',
      }
    ]
  
    this.tagsForm.get('tags')?.setValue(tagsFormArrayValues);
  }

  // patch FormControl value
  patchWebsiteValue(): void {
    const website = 'XperTuto';
    this.tagsForm.get('webSite')?.patchValue(website);
  }

  // patch FormGroup value
  patchTagsFormValue(): void {
    // removing the “webSite” property.
    const tagsFormGroupValues = {
      tags: [
        {
          technology: 'Angular',
          nb_tutorials: '100',
        }
      ]
    }
  
    this.tagsForm.patchValue(tagsFormGroupValues);
  }

  // patch FormArray value
  patchTagsValue(): void {
    // Removing the first object property  from the model : “technology”
    const tagsFormArrayValues = [
      {
        nb_tutorials: '200',
      }
    ]
  
    this.tagsForm.get('tags')?.patchValue(tagsFormArrayValues);
  }

  ngOnInit(): void {
    this.reactiveForm.get("name")?.valueChanges.subscribe(selectedValue => {
      console.log('name value changed')
      console.log(selectedValue);      //latest value of firstname
      console.log(this.reactiveForm.get("name")?.value)    //latest value of firstname
      console.log(this.reactiveForm.value)   //still shows the old first name
    })

    this.reactiveForm.statusChanges.subscribe(newStatus => {
      console.log('form Status changed event')
      console.log(newStatus)
    })
  }

}
