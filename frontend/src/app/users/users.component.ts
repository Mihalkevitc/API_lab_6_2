import { Component, inject } from '@angular/core';
import User from '../types/user';
import { UsersService } from '../services/users.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users:User[]=[];
  userServise = inject(UsersService);
  ngOnInit(){
    this.userServise.getUsers().subscribe(result=>{
      this.users=result;
      console.log(this.users);
    })
  }

  delete(id:string | undefined){
    if (!id) {
      console.error("User ID is undefined");
      return;
    }  

    const ok = confirm("Удалить?");
    if(ok){
      this.userServise.deleteUser(id).subscribe((result)=>{
        alert("Контакт удалён!");
        this.users = this.users.filter((u) => u._id != id); //Сортировка
      })
    }

  }
}
