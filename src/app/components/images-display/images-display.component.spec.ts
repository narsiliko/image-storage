import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesDisplayComponent } from './images-display.component';

describe('ImagesDisplayComponent', () => {
  let component: ImagesDisplayComponent;
  let fixture: ComponentFixture<ImagesDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesDisplayComponent]
    });
    fixture = TestBed.createComponent(ImagesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
