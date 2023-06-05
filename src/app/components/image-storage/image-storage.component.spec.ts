import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageStorageComponent } from './image-storage.component';

describe('ImageStorageComponent', () => {
  let component: ImageStorageComponent;
  let fixture: ComponentFixture<ImageStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageStorageComponent]
    });
    fixture = TestBed.createComponent(ImageStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
