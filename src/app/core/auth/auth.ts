import { Component } from '@angular/core';
import { Router } from 'express';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [RouterOutlet, FormsModule,
        NzGridModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        NzSliderModule,
        NzDividerModule,
        NzIconModule,
    ],
    templateUrl: './auth.html',
    styleUrls: ['./auth.css']
})
export class AuthComponent {
    size: NzButtonSize = 'large';
    router: any;

}