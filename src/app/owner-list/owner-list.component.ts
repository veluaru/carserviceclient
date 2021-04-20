import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  deleteOwnersArray: Array<string> = [];
  owners: Array<any>;

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }

  addDeleteOwnersArray(href) {
    if (this.deleteOwnersArray.includes(href)) {
      this.deleteOwnersArray.splice(this.deleteOwnersArray.indexOf(href), 1)
    } else {
      this.deleteOwnersArray.push(href)
    }
  }

  deleteOwners() {
    for (let i = 0; i < this.deleteOwnersArray.length; i++) {
      console.log(this.deleteOwnersArray[i]);
      this.ownerService.remove(this.deleteOwnersArray[i]).subscribe(result => {
        this.ownerService.getAll().subscribe(data => {
          this.owners = data._embedded.owners;
        });
      }, error => console.error(error));
    }
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }
}
