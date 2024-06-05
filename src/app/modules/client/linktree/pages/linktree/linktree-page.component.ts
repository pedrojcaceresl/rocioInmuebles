import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-linktree-page',
  templateUrl: './linktree-page.component.html',
  styleUrls: ['./linktree-page.component.scss']
})
export class LinktreePageComponent implements OnInit {
  title = 'linktree-clone-angular';
  data: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('/assets/data.json').subscribe((data) => {
      this.data = data;
      // console.log(this.data);
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
