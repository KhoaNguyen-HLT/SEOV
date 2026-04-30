import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
    selector: 'app-action-cell',
    templateUrl: './action-cell.html',
    styleUrls: ['./action-cell.css'],
    standalone: true,
    imports: [
        NzButtonModule,
        NzIconModule,
        NzTooltipModule,
        NzPopconfirmModule
    ],
})
export class ActionCellComponent implements ICellRendererAngularComp {
    params!: ICellRendererParams;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        return true;
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