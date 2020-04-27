import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() user;

  constructor(
    private dataProvider: DataProviderService
  ) {
    if (!this.user) {
      this.user = {username: "<no user>", idAdmin: false};
    }
  }

  ngOnInit(): void {
  }

}
