import { Component, NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
    imports: [
        NzButtonModule,
        NzIconModule,
        NzTooltipModule,
        NzPopconfirmModule
    ]
})
export class ActionCellModule { }

@Component({
    selector: 'app-action-cell',
    templateUrl: './action-cell.html',
    styleUrls: ['./action-cell.css'],
    standalone: true,
    imports: [ActionCellModule],
})
export class ActionCellComponent {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }

    onView() {
        this.params.context.componentParent.onView(this.params.data);
    }

    onEdit() {
        this.params.context.componentParent.onEdit(this.params.data);
    }

    onDelete() {
        this.params.context.componentParent.onDelete(this.params.data);
    }
}