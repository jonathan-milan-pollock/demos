import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatListOption } from '@angular/material/list';

import { KeywordValidators } from '@dark-rush-photography/website/util';

@Component({
  selector: 'drp-form-keywords-group',
  templateUrl: './form-keywords-group.component.html',
  styleUrls: ['./form-keywords-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormKeywordsGroupComponent implements OnInit {
  @Input() formKeywordsGroup?: FormGroup;
  @Input() keywordsFormControlName = '';
  @Input() keywords: string[] = [];

  @Output() keywordAdded = new EventEmitter<string>();
  @Output() keywordsDeleted = new EventEmitter<string[]>();

  ngOnInit(): void {
    this.formKeywordsGroup
      ?.get(this.keywordsFormControlName)
      ?.setValidators([
        KeywordValidators.required(this.keywords),
        KeywordValidators.unique(this.keywords),
      ]);
  }

  isKeywordInvalid(value: string): boolean {
    if (!value) return true;

    const keywordsFormControl = this.formKeywordsGroup?.get(
      this.keywordsFormControlName
    );
    if (!keywordsFormControl) return true;

    if (!keywordsFormControl.errors) return false;
    return keywordsFormControl.errors['duplicateKeyword'];
  }

  onAddKeyword(keywordEl: HTMLInputElement): void {
    this.keywordAdded.emit(keywordEl.value);
    keywordEl.value = '';
  }

  onDeleteKeywords(keywords: MatListOption[]): void {
    this.keywordsDeleted.emit(keywords.map((k) => k.value));
    keywords.length = 0;
  }
}
