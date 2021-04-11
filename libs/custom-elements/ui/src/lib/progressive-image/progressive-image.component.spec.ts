import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressiveImageComponent } from './progressive-image.component';

describe('ProgressiveImageComponent', () => {
  let component: ProgressiveImageComponent;
  let fixture: ComponentFixture<ProgressiveImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressiveImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressiveImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
