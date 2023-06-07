import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {

  private myUrl: any = 'http://www.localhost:5000/user_permissions'
  private userUrl: any = 'http://www.localhost:7000/mamui_users'
  currentuser: any

  constructor(private http: HttpClient) {}

  getPermissions(){
    return this.http.get(this.myUrl)
  }

  getUser(){
    return this.http.get(this.userUrl)
  }

  addGroup(task: any){
    console.log(task)
    return this.http.post(this.myUrl, task, httpOptions).subscribe(res => console.log(res))
  }

  deleteGroup(task: any){
    const urlWithID = `${this.myUrl}/${task}`
    return this.http.delete(urlWithID)
  }

  addUser(task: any){
    console.log(task)
    return this.http.post(this.userUrl, task, httpOptions).subscribe(res => console.log(res))
  }  

  deleteUser(task: any){
    const urlWithID = `${this.userUrl}/${task}`
    return this.http.delete(urlWithID)
  }

  getUserId(){
    this.http.get(this.userUrl).subscribe( (res: any) => {
    let current_user = res.filter( (i:any) => i.user_name == localStorage.getItem("user_name"))
    console.log(current_user[0].group_id)
    return current_user[0].group_id
    })
  }

}
