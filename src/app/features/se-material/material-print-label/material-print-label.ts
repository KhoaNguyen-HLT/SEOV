import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-material-print-label',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzSliderModule
  ],
  templateUrl: './material-print-label.html',
  styleUrls: ['./material-print-label.css']
})
export class MaterialPrintLabelComponent {

  label = {
    lotNo: 'AS23B378-20260526-001',
    materialCode: 'AS23B378',
    materialName: 'Thân ngoài ống bảo vệ',
    qty: 200,
    uom: 'PCS',
    location: 'WH-A01',
    expDate: '2026-11-26'
  };

  labelCount = 1;

  get qrUrl(): string {
    return `http://localhost:8081/seov/qrcode/genQrcode/${this.label.lotNo}`;
  }

  printLabel(): void {

    const count = Math.max(
      1,
      Number(this.labelCount || 1)
    );

    const labelsHtml = Array.from({ length: count })
      .map(() => `
        <div class="label">
          <div class="title">MATERIAL LOT LABEL</div>

          <div class="content">

            <div class="info">
              <div><b>LOT:</b> ${this.label.lotNo}</div>
              <div><b>PART:</b> ${this.label.materialCode}</div>
              <div><b>NAME:</b> ${this.label.materialName}</div>
              <div><b>QTY:</b> ${this.label.qty} ${this.label.uom}</div>
              <div><b>LOC:</b> ${this.label.location}</div>
              <div><b>EXP:</b> ${this.label.expDate}</div>
            </div>

            <div class="qr">
              <img
                class="qr-img"
                src="${this.qrUrl}" />
            </div>

          </div>
        </div>
      `)
      .join('');



    const printWindow = window.open(
      '',
      '_blank',
      'width=100,height=100'
    );

    if (!printWindow) return;

    printWindow.document.open();

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Label</title>

          <style>

            @page {
              size: 60mm 40mm;
              margin: 0;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
            }

            .label {
              width: 60mm;
              height: 40mm;
              border: 1px solid #000;
              padding: 4mm;
              box-sizing: border-box;
              background: white;
              overflow: hidden;

              page-break-after: always;
              break-after: page;
            }

            .label:last-child {
              page-break-after: auto;
              break-after: auto;
            }

            .title {
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              border-bottom: 1px solid #000;
              padding-bottom: 2mm;
              margin-bottom: 2mm;
            }

            .content {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .info {
              width: 68%;
              font-size: 11px;
              line-height: 1.5;
            }

            .qr {
              width: 16mm;
              height: 16mm;
            }

            .qr img {
              width: 100%;
              height: 100%;
              display: block;
            }

          </style>
        </head>

        <body>

          ${labelsHtml}

          <script>

            const images =
              Array.from(
                document.querySelectorAll('.qr-img')
              );

            let loaded = 0;

            function done() {
              loaded++;

              if (loaded >= images.length) {
                setTimeout(function () {
                  window.print();
                  window.close();
                }, 300);
              }
            }

            if (images.length === 0) {
              window.print();
              window.close();
            } else {

              images.forEach(function(img) {

                const image = img;

                if (
                  image.complete &&
                  image.naturalWidth > 0
                ) {
                  done();
                } else {
                  image.onload = done;
                  image.onerror = done;
                }

              });

            }

          </script>

        </body>
      </html>
    `);

    printWindow.document.close();
  }
}