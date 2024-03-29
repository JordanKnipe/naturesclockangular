import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegetableInfoBoxComponent } from './vegetable-info-box.component';

describe('VegetableInfoBoxComponent', () => {
  let component: VegetableInfoBoxComponent;
  let fixture: ComponentFixture<VegetableInfoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VegetableInfoBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VegetableInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
