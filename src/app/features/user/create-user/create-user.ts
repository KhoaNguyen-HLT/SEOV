import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { UserService } from '../user.service';

@Component({
  selector: 'create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule
  ],
  templateUrl: './create-user.html',
  styleUrls: ['./create-user.css']
})
export class CreateUserComponent implements OnInit {

  form!: FormGroup;

  sections: { id: number; name: string }[] = [];
  positions: { id: number; name: string }[] = [];
  roles: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: [''],
      email: ['', Validators.email],
      sections: [null],
      positionId: [null],
      roleIds: [[]]
    });

    this.loadData();
  }

  loadData() {
    // fake data (sau này gọi API)
    this.sections = [
      { id: 1, name: 'IT' },
      { id: 2, name: 'HR' }
    ];

    this.positions = [
      { id: 1, name: 'Manager' },
      { id: 2, name: 'Staff' }
    ];

    this.roles = [
      { id: 1, name: 'ADMIN' },
      { id: 2, name: 'USER' }
    ];
  }

  submit() {
    // if (this.form.invalid) return;
    var data = {
      username: "3014130",
      password: "12345",
      name: "khoa",
      email: "",
      section: "1",
      position: "1"
    }

    // console.log('Create user:', this.form.value);
    console.log('Create user:', data);
    this.userService.createUser(data).subscribe({
      next: (response) => {
        console.log('User created:', response);
        this.router.navigate(['/welcome/user']);
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
  }

  back() {
    this.router.navigate(['/welcome/user']);
  }
}