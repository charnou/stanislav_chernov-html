import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	private _windowScrollHeight: number = 20;

	public ngOnInit(): void {
		const bar: HTMLElement = document.querySelector('.nav__bar');

		window.addEventListener('scroll', () => {
			if (window.scrollY > this._windowScrollHeight) {
				bar.classList.add('nav__bar--active');
			} else {
				bar.classList.remove('nav__bar--active');
			}
		});
	}
}
