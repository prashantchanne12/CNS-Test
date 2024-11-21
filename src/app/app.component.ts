import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnatomicalStructuresComponent } from './components/anatomical-structures/anatomical-structures.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnatomicalStructuresComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
