import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  TestModuleMetadata,
} from '@angular/core/testing';

import { ThemeDirective } from './theme.directive';

@Component({
  template: `
    <div [drpTheme]="'Dark'"></div>
    <div [drpTheme]="'Light'"></div>
    <div [drpTheme]></div>
  `,
})
class TestComponent {}

describe('Directive: ThemeDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    const testModuleMetadata: TestModuleMetadata = {
      declarations: [ThemeDirective, TestComponent],
    };
    fixture = TestBed.configureTestingModule(
      testModuleMetadata
    ).createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) fixture.destroy();
  });

  describe('when theme is set to Dark', () => {
    let darkElement: HTMLDivElement;

    beforeEach(() => {
      const darkElementIndex = 0;
      darkElement = fixture.nativeElement.children[
        darkElementIndex
      ] as HTMLDivElement;
    });

    it('should not have a class of light-theme', () => {
      expect(darkElement.classList.contains('light-theme')).toBe(false);
    });
  });

  describe('when theme is set to Light', () => {
    let lightElement: HTMLDivElement;

    beforeEach(() => {
      const lightElementIndex = 1;
      lightElement = fixture.nativeElement.children[
        lightElementIndex
      ] as HTMLDivElement;
    });

    it('should have a class of light-theme', () => {
      expect(lightElement.classList.contains('light-theme')).toBe(true);
    });
  });

  describe('when theme is not set', () => {
    let unsetElement: HTMLDivElement;

    beforeEach(() => {
      const unsetElementIndex = 2;
      unsetElement = fixture.nativeElement.children[
        unsetElementIndex
      ] as HTMLDivElement;
    });

    it('should not have a class of light-theme', () => {
      expect(unsetElement.classList.contains('light-theme')).toBe(false);
    });
  });
});
