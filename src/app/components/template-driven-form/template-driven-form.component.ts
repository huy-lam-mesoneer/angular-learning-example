import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.scss']
})
export class TemplateDrivenFormComponent implements OnInit {

  userInfo = {
    userName: 'huylam',
    password: '',
    rememberMe: true,
  };
  userInfo1 = {
    userName: 'huylam',
    password: '',
    rememberMe: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit1(form: NgForm): void {
    console.log(form.value);
  }

  onSubmit2(form: NgForm): void {
    console.log(form.value);
  }
}
