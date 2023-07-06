import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './linktree-page.component.html',
  styleUrls: ['./linktree-page.component.scss'],
})
export class LinktreePageComponent {
  title = 'linktree-clone-angular';

  data: any;
  name: any;
  href: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe((data) => {
      this.data = data;
      this.name = data;
      console.log(this.data);
    });
  }

  shareUrl() {
    if (navigator.share) {
      navigator.share({
        title: 'Habla conmigo!',
        text: 'Quieres saber mas?',
        url: window.location.href,
      });
    }
  }
}
