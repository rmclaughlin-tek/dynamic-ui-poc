import { Component, OnInit } from '@angular/core';
import {OAuthService, AuthConfig, JwksValidationHandler} from 'angular-oauth2-oidc'
import { PermissionsApiService } from './services/permissions-api.service';


export const authConfig: AuthConfig = {
  issuer: 'https://trial-2834926.okta.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId: '0oa5mtrh6x2IRrTuG697',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'project-poc';

  constructor(private oauthService: OAuthService, private permissionsApi: PermissionsApiService){
    this.oauthService.configure(authConfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  }

  login(){
    this.oauthService.initImplicitFlow()
  }

  logout(){
    localStorage.removeItem("user_name")
    localStorage.removeItem("id_token")
    localStorage.removeItem("user_id")
    window.location.reload()
    this.oauthService.logOut()
  }

  getUserName(){
    const claims = this.oauthService.getIdentityClaims();
    let id_token: any = this.oauthService['_storage'].getItem("id_token")
    if(!claims){
      return null
    }
     localStorage.setItem("id_token", id_token)
     localStorage.setItem("user_name", claims['name'].split("  ").join(" "))
     return claims['name']
  }

}
