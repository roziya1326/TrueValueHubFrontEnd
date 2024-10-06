import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListNewComponent } from './item-list-new.component';

describe('ItemListNewComponent', () => {
  let component: ItemListNewComponent;
  let fixture: ComponentFixture<ItemListNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
