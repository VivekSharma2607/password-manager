import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postpass(data : any){
    return this.http.post<any>("http://localhost:3000/passwordlist/" , data)
  }
  getpass() {
    return this.http.get<any>("http://localhost:3000/passwordlist/")
  }
  updatepass(data : any , id: number) {
    return this.http.put<any>("http://localhost:3000/passwordlist/"+id , data)
  }
  deletepass(id : number) {
    return this.http.delete<any>("http://localhost:3000/passwordlist/"+id)
  }
}
