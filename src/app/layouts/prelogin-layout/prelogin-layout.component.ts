import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-prelogin-layout",
  templateUrl: "./prelogin-layout.component.html",
  styleUrls: ["./prelogin-layout.component.scss"],
})
export class PreLoginLayoutComponent implements OnInit, OnDestroy {
  test: Date = new Date();
  public isCollapsed = true;
  pageBgColors = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("prelogin-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  getPath() {
    return this.router.url;
  }

  ngOnDestroy() {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("prelogin-layout");
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }
}

export class PageBgColor {
  constructor(public urlData: string, public bgClass: string) {}
}
