import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-overview',
  templateUrl: './filter-overview.component.html',
  styleUrls: ['./filter-overview.component.scss']
})
export class FilterOverviewComponent implements OnInit {

  filters: string[] = ['Time: 1600-1700', 'Author: August Stauda', 'Technique: Photography'];


  constructor() { }

  ngOnInit(): void {
  }

  remove(fruit: string): void {
    const index = this.filters.indexOf(fruit);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }
  }

}
