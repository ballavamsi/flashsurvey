import { Injectable } from '@angular/core';

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

}
