import { Injectable } from '@angular/core';
import { Member } from 'src/app/model/member-model';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public teamMembers: Array<any> = null;
  public tasks: Array<any> = null;
  public user: Member = null;
  private id: number = 1000;
  constructor() {;
  }

  getId() {
    this.id = ++this.id
    return this.id;
  }

  // getTeamMembers(endpoint: string) {
  //   const url = `${this.baseUrl}${endpoint}`;
  //   this.http.get(url).subscribe(data => {
  //     return data;
  //   },
  //     error => {
  //       console.log(error);
  //})
  }
