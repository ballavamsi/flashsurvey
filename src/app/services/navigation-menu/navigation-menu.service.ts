import { Injectable } from '@angular/core';
import { NavigationModel } from 'src/app/models/navigation';

@Injectable({
  providedIn: 'root'
})
export class NavigationMenuService {
private navigationMenuItems: NavigationModel[]
constructor() {
  this.navigationMenuItems = [

    {name: 'Home', url: '.', children:[]},
    {name: 'Poll', url: '#', children :[
      {name: 'Create', url: 'poll/new', children: []},
      {name: 'Vote / Results', url: 'poll/search', children: []},
    ]},
    {name: 'Survey', url: '#', children :[
      {name: 'Create', url: 'survey/new', children: []},
      {name: 'Give Survey', url: 'survey/search', children: []},
    ]},
    {name: 'Status', url: 'status', children: []}];
    // {name: 'Home', url: '.'},
    // // {name: 'Dashboard', url: 'dashboard'},
    // {name: 'New Poll', url: 'poll/new'},
    // // {name: 'New Survey', url: 'survey/new'},
    // {name: 'Status', url: 'status'}];
}

get() : NavigationModel[] {
  return this.navigationMenuItems;
}

}

