import { Injectable } from '@angular/core';
import { UserLoginResponse } from 'src/app/models/users';
import { Constants } from 'src/app/variables/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

constructor() { }

setLocal(key: any,  value: any) {
  window.localStorage.setItem(key,value);
}

getLocal(key) {
  return window.localStorage.getItem(key);
}

removeLocal(key){
  window.localStorage.removeItem(key);
}

setSession(key: any,  value: any) {
  window.sessionStorage.setItem(key,value);
}

getSession(key) {
  return window.sessionStorage.getItem(key);
}

removeSession(key){
  window.sessionStorage.removeItem(key);
}

clearAllSession(){
  window.sessionStorage.clear();
}

getUserSessionDetails(): UserLoginResponse{
  return JSON.parse(this.getSession(Constants.SessionKey));
}

}
