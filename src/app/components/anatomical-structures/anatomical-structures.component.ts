import { Component } from '@angular/core';
import { Structure } from '../../models/anatomical-structure-model';
import { AnatomicalStructureService } from '../../services/anatomical-structure.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-anatomical-structures',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './anatomical-structures.component.html',
  styleUrl: './anatomical-structures.component.scss',
})
export class AnatomicalStructuresComponent {
  uniqueStructures: Structure[] = [];

  constructor(private anatomicalStructureService: AnatomicalStructureService) {}

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

      console.log(this.uniqueStructures);
    });
  }

  onStructureClick(structure: Structure) {
    console.log('Clicked structure:', structure);
  }
}
