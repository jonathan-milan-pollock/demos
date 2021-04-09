import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'drp-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent {
  @Input() name: string = '';

  serverId = 10;
  private _serverStatus = 'offline';

  get serverStatus(): string {
    return this._serverStatus;
  }
}
