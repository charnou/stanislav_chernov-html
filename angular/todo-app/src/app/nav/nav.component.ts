import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const bar: HTMLElement = document.querySelector('.nav__bar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        bar.classList.add('nav__bar--active');
      } else {
        bar.classList.remove('nav__bar--active');
      }
    });
  }
}
