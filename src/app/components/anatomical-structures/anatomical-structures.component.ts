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
@Component({
  selector: 'app-anatomical-structures',
  templateUrl: './anatomical-structures.component.html',
  styleUrls: ['./anatomical-structures.component.scss'],
  imports: [CommonModule, MatCardModule, MatIconModule, MatDialogModule],
})
export class AnatomicalStructuresComponent implements OnInit {
  uniqueStructures: Structure[] = [];
  selectedStructureDetails?: StructureDetails;

  constructor(
    private anatomicalStructureService: AnatomicalStructureService,
    private anatomicalStructureDetailsService: AnatomicalStructureDetailsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.anatomicalStructureService.fetchData().subscribe((data) => {
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
      width: '500px',
      data: details,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  closeDetails() {
    this.selectedStructureDetails = undefined;
  }
}
