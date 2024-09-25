import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import User from '../../types/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  formBuilder=inject(FormBuilder)
  userForm:FormGroup=this.formBuilder.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    phone:['', [Validators.required, Validators.minLength(5)]]
  });

  userService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  editUserId!:string;

  // Отображение данных в полях ввода при изменнении контакта
  ngOnInit(){
    this.editUserId = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);  // Проверка, что параметр id присутствует

    if(this.editUserId){
      this.userService.getUser(this.editUserId).subscribe(result=>{

        console.log(result);  // Проверка, что данные приходят корректно
 
        this.userForm.patchValue(result);
      })
    }
  }

  addUser(){
    if(this.userForm.invalid){
      alert("Пожалуйста, проверьте правильность заполнения полей");
      return;
    }
    console.log(this.userForm.value);
    const model:User = this.userForm.value;
    this.userService.addUser(model).subscribe(result=>{ 
      alert("Контакт добавлен!");
      this.router.navigateByUrl("/");

    })
  }

  updateUser(){
    if(this.userForm.invalid){
      alert("Пожалуйста, проверьте правильность заполнения полей");
      return;
    }

    const model:User = this.userForm.value;

    this.userService.updateUser(this.editUserId,model).subscribe(result=>{
      alert("Контакт изменён!");
      this.router.navigateByUrl("/");

    })
  }
}
