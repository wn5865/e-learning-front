import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.css'],
})
export class NavSearchComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  submit(value: any) {
    this.router.navigate(['/courses'], {
      queryParams: { keyword: value.keyword || '' },
    });
  }
}
