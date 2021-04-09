import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'drp-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent implements OnInit {
  servers: string[] = ['server 1', 'server 2'];

  constructor() {}

  ngOnInit(): void {}

  addServer() {
    this.servers.push('another server');
  }
}
