import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoredImageCardComponent } from './stored-image-card.component';

describe('StoredImageCardComponent', () => {
  let component: StoredImageCardComponent;
  let fixture: ComponentFixture<StoredImageCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoredImageCardComponent]
    });
    fixture = TestBed.createComponent(StoredImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
