import { Injectable } from '@angular/core';
import { UserSignInModel } from 'src/app/models/users';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(public api: ApiService) { }

  public signInUser(data: UserSignInModel) {
    return this.api.signInUser(data);
  }
}
