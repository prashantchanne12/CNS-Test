import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomicalStructureDetailsComponent } from './anatomical-structure-details.component';

describe('AnatomicalStructureDetailsComponent', () => {
  let component: AnatomicalStructureDetailsComponent;
  let fixture: ComponentFixture<AnatomicalStructureDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnatomicalStructureDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnatomicalStructureDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
