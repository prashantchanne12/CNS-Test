import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnatomicalStructuresComponent } from './anatomical-structures.component';

describe('AnatomicalStructuresComponent', () => {
  let component: AnatomicalStructuresComponent;
  let fixture: ComponentFixture<AnatomicalStructuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnatomicalStructuresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnatomicalStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
