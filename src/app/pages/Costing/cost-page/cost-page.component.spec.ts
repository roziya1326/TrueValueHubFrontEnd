import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPageComponent } from './cost-page.component';

describe('CostPageComponent', () => {
  let component: CostPageComponent;
  let fixture: ComponentFixture<CostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
