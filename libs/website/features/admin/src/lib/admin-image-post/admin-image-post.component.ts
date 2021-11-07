import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { EntityAdmin } from '@dark-rush-photography/shared/types';
import { Page } from '@dark-rush-photography/website/types';
import {
  MetaService,
  createImagePost,
} from '@dark-rush-photography/website/data';

@Component({
  templateUrl: './admin-image-post.component.html',
  styleUrls: ['./admin-image-post.component.scss'],
})
export class AdminImagePostComponent implements OnInit {
  private imagePost?: EntityAdmin;
  private imagePostSub?: Subscription;

  isLoading = true;
  error?: string;

  imagePostForm = this.fb.group({
    image: ['', Validators.required],
    imagePostFormGroup: this.fb.group({
      title: ['', Validators.required],
      text: [''],
    }),
  });

  constructor(
    private readonly store: Store<{
      imagePost?: EntityAdmin;
      isLoading: boolean;
      error?: string;
    }>,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly metaService: MetaService
  ) {}

  get imagePostFormGroup(): FormGroup {
    return this.imagePostForm.get('imagePostFormGroup') as FormGroup;
  }

  ngOnInit(): void {
    this.metaService.addMetadataForPage$(Page.AdminImagePost, this.router.url);

    this.imagePostSub = this.store.subscribe((imagePostState) => {
      this.imagePost = imagePostState.imagePost;
      this.isLoading = imagePostState.isLoading;
      this.error = imagePostState.error;
    });
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.imagePostForm?.dirty) {
      // prompt for save;
    }
    return true;
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.imagePost) {
      this.store.dispatch(createImagePost({ imagePost: this.imagePost }));
    }
    this.imagePostForm?.reset();
  }
}
