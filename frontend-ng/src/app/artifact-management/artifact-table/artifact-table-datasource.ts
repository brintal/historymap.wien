import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {merge, Observable} from 'rxjs';
import {Artifact} from "../../shared/generated/domain";

/**
 * Data source for the ArtifactTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ArtifactTableDataSource extends DataSource<Artifact> {
  data: Artifact[] = [];
  paginator: MatPaginator;
  sort: MatSort;
  artifacts$: Observable<Artifact[]>;

  constructor(artifacts$: Observable<Artifact[]>) {
    super();
    this.artifacts$ = artifacts$;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Artifact[]> {
    this.artifacts$.subscribe(artifacts => {
      this.data = artifacts;
      this.paginator.length = this.data.length;
    });
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.artifacts$,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Artifact[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Artifact[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.onbImageId, +b.onbImageId, isAsc);
        case 'year':
          return compare(+a.year, +b.year, isAsc);
        case 'longitude':
          return compare(+a.location.longitude, +b.location.longitude, isAsc);
        case 'latitude':
          return compare(+a.location.latitude, +b.location.latitude, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
