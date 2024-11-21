import { Component, OnInit } from '@angular/core';
import { AnatomicalStructureService } from '../../services/anatomical-structure.service';
import { AnatomicalStructureDetailsService } from '../../services/anatomical-structure-details.service';
import { Structure } from '../../models/anatomical-structure-model';
import { StructureDetails } from '../../models/anatomical-structure-detail-model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AnatomicalStructureDetailsComponent } from '../anatomical-structure-details/anatomical-structure-details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule,
  ],
})
export class AnatomicalStructuresComponent implements OnInit {
  uniqueStructures: Structure[] = [];
  selectedStructureDetails?: StructureDetails;
  isLoading = true;

  constructor(
    private anatomicalStructureService: AnatomicalStructureService,
    private anatomicalStructureDetailsService: AnatomicalStructureDetailsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.anatomicalStructureService.fetchData().subscribe({
      next: (data) => {
        const structures: Structure[] = data.data
          .map((row: any) => row.anatomical_structures)
          .flat();

        const uniqueNames = new Set(
          structures
            .filter((s): s is Structure => s?.name != null)
            .map((s) => s.name)
        );

        this.uniqueStructures = Array.from(uniqueNames)
          .map((name) => structures.find((s) => s.name === name)!)
          .filter((s): s is Structure => s !== undefined);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onStructureClick(structure: Structure) {
    if (structure.id) {
      this.anatomicalStructureDetailsService
        .fetchDetails(structure.id?.replace(':', '_')!)
        .subscribe((details) => {
          this.openDetailsDialog(details);
        });
    } else {
      this.openDetailsDialog();
    }
  }

  openDetailsDialog(details?: StructureDetails) {
    const dialogRef = this.dialog.open(AnatomicalStructureDetailsComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: details,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  closeDetails() {
    this.selectedStructureDetails = undefined;
  }
}
