import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements AfterViewInit {

  constructor(private el: ElementRef) { }

  @ViewChild('login') loginMenu: ElementRef;
  @ViewChild('logout') logoutMenu: ElementRef;
  
  ngAfterViewInit(): void {
    let token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.loginMenu.nativeElement.classList.add('non-visible');
    }
    else {
      this.logoutMenu.nativeElement.classList.add('non-visible');
    }
  }

}
