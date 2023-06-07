import { Component, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { PermissionsApiService } from 'src/app/services/permissions-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  
  @Input() currentUserId: any

  public flag: boolean = false
  public num : Number = 1

  constructor(public permissionsApi: PermissionsApiService){}

  enterAdmin(){
    this.flag = !this.flag
  }

}
