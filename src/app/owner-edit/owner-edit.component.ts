import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owner: any = {};
  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      console.log(dni);
      if (dni) {
        this.ownerService.getByDni(dni).subscribe((owner: any) => {
          if (owner) {
            console.log(owner);
            this.owner = owner._embedded.owners[0];
            this.owner.href = owner._embedded.owners[0]._links.self.href;
          } else {
            console.log(`Owner with dni '${dni}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
    
  }
  gotoList() {
    this.router.navigate(['/owner-list']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
