import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from '../client-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule,
    MatButtonModule, MatFormFieldModule, FormsModule,
    MatDialogModule ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor (public dialog: MatDialog,
    private client: ClientServiceService,
    private http: HttpClient) { }

  username: string = ""
  password: string = ""

  logar()
  {
    this.client.login({
      login: this.username,
      password: this.password
    }, (result: any) => {
      if (result == null)
      {
        alert('Senha ou usuário incorreto!')
      }
      else
      {
        sessionStorage.setItem('jwt', JSON.stringify(result))
      }
    })
  }

  registrar()
  {
    this.dialog.open(NewUserDialog);
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    var jwt = sessionStorage.getItem('jwt');
    if (jwt == null)
      return
    formData.append('jwt', jwt)
     
    this.http.put('https://localhost:7122/user/image', formData)
      .subscribe(result => console.log("ok!"));
  }
}

@Component({
  selector: 'app-new-user-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule,
    MatButtonModule, MatFormFieldModule, FormsModule ],
  templateUrl: './new-user-dialog.component.html',
  styleUrl: './login-page.component.css'
})
export class NewUserDialog
{
  username: string = ""
  password: string = ""
  repeatPassword: string = ""

  constructor(public dialogRef: MatDialogRef<NewUserDialog>,
    private client: ClientServiceService
    ) {}

  create()
  {
    this.client.register({
      login: this.username,
      password: this.password
    })

    this.dialogRef.close()
  }
}