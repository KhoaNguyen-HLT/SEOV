
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormRecord, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AndonService } from '../se-andon.service';

@Component({
  selector: 'se-andon-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    // NzOptionComponent,
    NzSelectModule
  ],
  templateUrl: './se-andon-request.html',
  styleUrls: ['./se-andon-request.css']
})


export class seAndonRequestComponent implements OnInit {
  constructor(private fb: FormBuilder, private andonService: AndonService) { }
  requestForm!: FormGroup;

  ngOnInit() {
    this.requestForm = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, []],
      priority: ['MEDIUM']
    });
  }


  onSubmit() {
    if (this.requestForm.valid) {
      const payload = this.requestForm.value;
      console.log(payload);
      this.andonService.sendRequest(3014125).subscribe((res) => {
        console.log(res);
      });
    }
  }
}