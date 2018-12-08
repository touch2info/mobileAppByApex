import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  public teamMembers: Array<any> = null;
  constructor() {;
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
