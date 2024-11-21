import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AnatomicalStructureService } from './services/anatomical-structure.service';
import { Structure } from './models/anatomical-structure-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cns';
  uniqueStructures: string[] = [];

  constructor(private anatomicalStructureService: AnatomicalStructureService) {}

  ngOnInit() {
    this.anatomicalStructureService.fetchData().subscribe((data) => {
      const structures: Structure[] = data.data
        .map((row: any) => row.anatomical_structures)
        .flat();

      this.uniqueStructures = Array.from(
        new Set(
          structures
            .map((s) => s.name)
            .filter(
              (name): name is string => name !== null && name !== undefined
            )
        )
      );
      console.log(this.uniqueStructures);
    });
  }
}
