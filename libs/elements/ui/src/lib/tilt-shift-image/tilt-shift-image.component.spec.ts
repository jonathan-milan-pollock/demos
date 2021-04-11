import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiltShiftImageComponent } from './tilt-shift-image.component';

describe('TiltShiftImageComponent', () => {
  let component: TiltShiftImageComponent;
  let fixture: ComponentFixture<TiltShiftImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiltShiftImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiltShiftImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
