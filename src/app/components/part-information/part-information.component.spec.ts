import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInformationComponent } from './part-information.component';

describe('PartInformationComponent', () => {
  let component: PartInformationComponent;
  let fixture: ComponentFixture<PartInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
