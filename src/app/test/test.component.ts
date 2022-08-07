import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'test',
  styleUrls: ['./test.component.scss'],
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {
  cities: City[] = [];
  selectedCities1: City[] = [];
  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
