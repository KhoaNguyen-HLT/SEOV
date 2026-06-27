import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
    selector: 'app-reject-reason-modal',
    standalone: true,
    imports: [CommonModule, FormsModule, NzInputModule, NzButtonModule, NzIconModule],
    templateUrl: './reject.html',
    styleUrls: ['./reject.css'],

})
export class RejectReasonModalComponent {
    reason = '';
    submitted = false;

    constructor(private modalRef: NzModalRef) { }

    cancel() {
        this.modalRef.destroy();
    }

    confirm() {
        this.submitted = true;

        if (!this.reason.trim()) {
            return;
        }

        this.modalRef.destroy({
            reason: this.reason.trim()
        });
    }
}