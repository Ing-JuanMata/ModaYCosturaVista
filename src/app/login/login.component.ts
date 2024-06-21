import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  value = '';
  title = 'ModaYCosturaView';
  form: FormGroup;
  unknownPhone = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.form = formBuilder.group({
      phone: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      }),
    });
  }

  submit() {
    this.router.navigate(['main']);
    return;
    this.unknownPhone = false;
    this.clientService
      .getClient(this.form.get('phone')!.value)
      .subscribe((o) => {
        if (o.data == null) {
          this.unknownPhone = true;
          return;
        }
        this.router.navigate(['main']);
      });
  }
}
