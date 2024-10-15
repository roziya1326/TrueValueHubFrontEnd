import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftNewComponent } from './draft-new.component';

describe('DraftNewComponent', () => {
  let component: DraftNewComponent;
  let fixture: ComponentFixture<DraftNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DraftNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
