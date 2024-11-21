import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StructureDetails } from '../../models/anatomical-structure-detail-model';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-anatomical-structure-details',
  templateUrl: './anatomical-structure-details.component.html',
  styleUrls: ['./anatomical-structure-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
  ],
})
export class AnatomicalStructureDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<AnatomicalStructureDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StructureDetails
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
