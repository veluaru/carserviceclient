import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNERS_API = this.API + '/owners';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/owners');
  }

  get(id: string) {
    return this.http.get(this.OWNERS_API + '/' + id);
  }

  getByDni(dni: string) {
    return this.http.get(this.OWNERS_API + '/search/findByDni?dni=' + dni);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNERS_API, owner);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
