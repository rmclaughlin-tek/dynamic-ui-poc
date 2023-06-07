import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { PermissionsApiService } from '../../services/permissions-api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @Output() addGroup: EventEmitter<any> = new EventEmitter()

  user_type!: string
  download: boolean = false
  clip: boolean = false
  delete: boolean = false
  myData: any
  userData: any

  group_id!: string
  user_name!: string

  constructor(private permissionsApi: PermissionsApiService){}

  ngOnInit(): void {
    this.permissionsApi.getPermissions().subscribe( (res: any) => this.myData = res)
    this.permissionsApi.getUser().subscribe( (res: any) => this.userData = res)
  }

  onSubmit(){
    const newGroup = {
      user_type: this.user_type,
      download: this.download,
      clip: this.clip,
      delete: this.delete
    }
    this.permissionsApi.addGroup(newGroup)
    this.permissionsApi.getPermissions().subscribe( (res: any) => this.myData = res)
    
    this.user_type = ''
    this.download = false
    this.clip = false
    this.delete = false   

    this.permissionsApi.getPermissions().subscribe( (res: any) => this.myData = res)  
  }


  userSubmit(){
    const newUser = {
      group_id: Number(this.group_id),
      user_name: this.user_name
    }

    this.permissionsApi.addUser(newUser)

    this.permissionsApi.getUser().subscribe( (res: any) => this.userData = res)
    
    this.group_id = '',
    this.user_name = '' 
    
    this.permissionsApi.getUser().subscribe( (res: any) => this.userData = res)  
  }

  
    


  onDelete(task: any){
    this.permissionsApi.deleteGroup(task).subscribe( () => 
      this.myData = this.myData.filter( (res: any) => res.id !== task))
  }

  onUserDelete(task: any){
    this.permissionsApi.deleteUser(task).subscribe( () => 
      this.userData = this.userData.filter( (res: any) => res.id !== task))
  }
}
