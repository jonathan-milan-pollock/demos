import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public envFileLoaded = false;

  public apiUrl = '';

  public enableDebug = true;
}
