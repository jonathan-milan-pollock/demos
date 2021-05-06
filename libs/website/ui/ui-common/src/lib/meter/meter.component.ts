import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'drp-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterComponent {
  @Input() value = 10;
  @Input() greatMinValue = 80;
  @Input() goodMinValue = 60;
  @Input() warnMinValue = 30;

  get greatMeterClass(): boolean {
    return this.value >= this.greatMinValue;
  }

  get goodMeterClass(): boolean {
    return this.value >= this.goodMinValue && this.value < this.greatMinValue;
  }

  get warnMeterClass(): boolean {
    return this.value >= this.warnMinValue && this.value < this.goodMinValue;
  }

  get errorMeterClass(): boolean {
    return this.value < this.warnMinValue;
  }

  meterState(): string {
    if (this.greatMeterClass) return 'great';
    if (this.goodMeterClass) return 'good';
    if (this.warnMeterClass) return 'warn';
    return 'error';
  }
}
