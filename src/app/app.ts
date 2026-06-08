import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoadingService } from './shared/service/loading.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, NzInputModule, NzFormModule, NzButtonModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(private loadingService: LoadingService) { }
  isLoading$!: Observable<boolean>;
  ngOnInit() {
    this.isLoading$ = this.loadingService.isLoading$;
  }
  protected readonly title = signal('seov-fe');
}
