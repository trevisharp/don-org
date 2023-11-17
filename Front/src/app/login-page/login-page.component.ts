import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientServiceService } from '../client-service.service';


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
  constructor (public dialog: MatDialog) { }

  username: string = ""
  password: string = ""

  logar()
  {
    
  }

  registrar()
  {
    this.dialog.open(NewUserDialog);
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