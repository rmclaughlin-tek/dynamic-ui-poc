import { Component, OnInit } from '@angular/core';
import { PermissionsApiService } from '../../services/permissions-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user_permissions: any
  user_id: any

  constructor(private permissionsApi: PermissionsApiService) { }

  ngOnInit() {
    this.permissionsApi.getUser().subscribe((res: any) => {
      let current_user = res.filter((i: any) => i.user_name == localStorage.getItem("user_name"))
      this.user_id = current_user[0].group_id
      console.log(this.user_id)
      localStorage.setItem("user_id", current_user[0].group_id)

      console.log("Current User", current_user)

      this.permissionsApi.getPermissions().subscribe((res: any) => {
        console.log("Before: ", res)
        this.user_permissions = res.filter((item: any) => item.id == localStorage.getItem("user_id"))
        console.log("After: ", this.user_permissions)
      })

    })

  }

  buttonClick(event: string) {
    console.log(`${event} clicked!`)
  }

}
