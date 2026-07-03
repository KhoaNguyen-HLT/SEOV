import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-action-cell',
    templateUrl: './action-cell.html',
    styleUrls: ['./action-cell.css'],
    standalone: true,
    imports: [
        NzButtonModule,
        NzIconModule,
        NzTooltipModule,
        NzPopconfirmModule,
        CommonModule
    ],
})
export class ActionCellComponent implements ICellRendererAngularComp {
    params!: ICellRendererParams;
    showView: boolean = false;
    showEdit: boolean = false;
    showDelete: boolean = false;
    showOpen: boolean = false;
    showUpdateRole: boolean = false;
    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.setupPermissions();
    }

    setupPermissions() {
        // Dễ dàng mở rộng
        const config = this.params?.colDef?.cellRendererParams || {};
        this.showOpen = config.showOpen ?? true;
        this.showView = config.showView ?? true;
        this.showEdit = config.showEdit ?? true;
        this.showDelete = config.showDelete ?? true
         this.showUpdateRole = config.showUpdateRole ?? false;
    }

    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        this.setupPermissions();
        return true;
    }

    onOpen() {
        (this.params.context as any).componentParent.onOpen(this.params.data);
    }

    onUpdateRole() {
        (this.params.context as any).componentParent.onUpdateRole(this.params.data);
    }

    onView() {
        (this.params.context as any).componentParent.onView(this.params.data);
    }

    onEdit() {
        (this.params.context as any).componentParent.onEdit(this.params.data);
    }

    onDelete() {
        (this.params.context as any).componentParent.onDelete(this.params.data);
    }
}