import { Component, OnInit, signal, computed } from '@angular/core';
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
  structures = signal<Structure[]>([]);
  selectedDetails = signal<StructureDetails | undefined>(undefined);
  isLoading = signal(true);

  uniqueStructures = computed(() => {
    const structuresArray = this.structures();
    const uniqueNames = new Set(
      structuresArray
        .filter((structure): structure is Structure => structure?.name != null)
        .map((structure) => structure.name)
    );

    return Array.from(uniqueNames)
      .map(
        (name) => structuresArray.find((structure) => structure.name === name)!
      )
      .filter((structure): structure is Structure => structure !== undefined);
  });

  constructor(
    private anatomicalStructureService: AnatomicalStructureService,
    private anatomicalStructureDetailsService: AnatomicalStructureDetailsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.anatomicalStructureService.fetchStructures().subscribe({
      next: (data) => {
        const structures: Structure[] = data.data
          .map((row: any) => row.anatomical_structures)
          .flat();

        this.structures.set(structures);
      },
      complete: () => {
        this.isLoading.set(false);
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

    dialogRef.afterClosed().subscribe(() => {
      this.selectedDetails.set(undefined);
    });
  }

  closeDetails() {
    this.selectedDetails.set(undefined);
  }
}
