import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/azure-database';

import { v4 as uuidv4 } from 'uuid';
import { from, map, Observable } from 'rxjs';

import {
  MediaProcess,
  MediaProcessType,
} from '@dark-rush-photography/shared/types';
import { setMediaProcessReady } from '../content/media-process-state.functions';
import { MediaProcessTable } from '../tables/media-process.table';

@Injectable()
export class MediaProcessStartProvider {
  constructor(
    @InjectRepository(MediaProcessTable)
    private readonly mediaProcessRepository: Repository<MediaProcessTable>
  ) {}

  publish$(entityId: string): Observable<MediaProcess> {
    const mediaProcess = new MediaProcessTable();
    mediaProcess.key = uuidv4();
    mediaProcess.type = MediaProcessType.Publish;
    mediaProcess.entityId = entityId;
    mediaProcess.mediaId = '';
    mediaProcess.imageState = '';
    setMediaProcessReady(mediaProcess);

    return from(
      this.mediaProcessRepository.create(mediaProcess, mediaProcess.key)
    ).pipe(map(() => mediaProcess));
  }

  postSocialMedia$(entityId: string): Observable<MediaProcess> {
    const mediaProcess = new MediaProcessTable();
    mediaProcess.key = uuidv4();
    mediaProcess.type = MediaProcessType.PostSocialMedia;
    mediaProcess.entityId = entityId;
    mediaProcess.mediaId = '';
    mediaProcess.imageState = '';
    setMediaProcessReady(mediaProcess);

    return from(
      this.mediaProcessRepository.create(mediaProcess, mediaProcess.key)
    ).pipe(map(() => mediaProcess));
  }

  deleteEntity$(entityId: string): Observable<MediaProcess> {
    const mediaProcess = new MediaProcessTable();
    mediaProcess.key = uuidv4();
    mediaProcess.type = MediaProcessType.DeleteEntity;
    mediaProcess.entityId = entityId;
    mediaProcess.mediaId = '';
    mediaProcess.imageState = '';
    setMediaProcessReady(mediaProcess);

    return from(
      this.mediaProcessRepository.create(mediaProcess, mediaProcess.key)
    ).pipe(map(() => mediaProcess));
  }

  loadNewImages$(entityId: string): Observable<MediaProcess> {
    const mediaProcess = new MediaProcessTable();
    mediaProcess.key = uuidv4();
    mediaProcess.type = MediaProcessType.LoadNewImages;
    mediaProcess.entityId = entityId;
    mediaProcess.mediaId = '';
    setMediaProcessReady(mediaProcess);

    return from(
      this.mediaProcessRepository.create(mediaProcess, mediaProcess.key)
    ).pipe(map(() => mediaProcess));
  }
}
