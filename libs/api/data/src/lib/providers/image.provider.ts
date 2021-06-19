import { HttpService, Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Image } from '@dark-rush-photography/shared-types';
import { EnvServerless } from '@dark-rush-photography/api/types';
import { DocumentModel } from '../schema/document.schema';
import { toImage } from '../functions/image.functions';
import { getFormData } from '../functions/form-data.functions';

@Injectable()
export class ImageProvider {
  findById$(
    entityModel: Model<DocumentModel>,
    entityId: string,
    imageId: string
  ): Observable<Image> {
    return from(entityModel.findById(entityId).exec()).pipe(
      map((response) => {
        if (!response) throw new NotFoundException('Could not find entity');

        const foundImage = response.images.find((i) => i.id === imageId);
        if (!foundImage)
          throw new NotFoundException('Could not find image by id');

        return toImage(foundImage);
      })
    );
  }

  uploadThreeSixty$(
    envServerless: EnvServerless,
    httpService: HttpService,
    entityId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const formData = getFormData(file, file.originalname, entityId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-three-sixty-image`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }

  uploadReview$(
    envServerless: EnvServerless,
    httpService: HttpService,
    reviewId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const formData = getFormData(file, file.originalname, reviewId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-review-image`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }

  uploadMediaPng$(
    envServerless: EnvServerless,
    httpService: HttpService,
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const formData = getFormData(file, file.originalname, mediaId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-png-image`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }

  uploadMediaAppleIcon$(
    envServerless: EnvServerless,
    httpService: HttpService,
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const formData = getFormData(file, file.originalname, mediaId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-apple-icon`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }

  uploadMediaAppleResource$(
    envServerless: EnvServerless,
    httpService: HttpService,
    mediaId: string,
    file: Express.Multer.File
  ): Observable<Image> {
    const formData = getFormData(file, file.originalname, mediaId);
    return from(
      httpService.post(
        `${envServerless.drpServerlessUrl}/upload-apple-resource`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Content-Length': formData.getLengthSync(),
            'x-functions-key': envServerless.drpServerlessFunctionsKey,
          },
        }
      )
    ).pipe(map((axiosResponse) => axiosResponse.data));
  }
}
