import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'test',
  styleUrls: ['./test.component.scss'],
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {
  items: MenuItem[] = [];
  display = true;
  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
          },
          {
            label: 'Search',
            icon: 'pi pi-search',
          },
          {
            label: 'Library',
            icon: 'pi pi-book',
          },
        ],
      },
      {
        items: [
          {
            label: 'Create a playlist',
            icon: 'pi pi-plus',
          },
          {
            label: 'Liked Songs',
            icon: 'pi pi-heart-fill',
          },
        ],
      },
      {
        items: [
          {
            label: 'Create a playlist',
            badge: 'test',
            expanded: true,
            icon: 'pi pi-plus',
          },
          {
            label: 'Liked Songs',
            icon: 'pi pi-heart-fill',
          },
        ],
      },
    ];
  }
}
