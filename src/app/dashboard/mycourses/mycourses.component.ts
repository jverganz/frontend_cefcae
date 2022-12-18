import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// Services
import { EnrollmentService } from 'src/app/services/enrollments.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: []
})
export class MyCoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'headquarter', 'state'];
  table: MatTableDataSource<any>;
  list: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private enrollmentService: EnrollmentService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.table = new MatTableDataSource(this.list);
  }

  async ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.table.paginator = this.paginator;
    this.table.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.table.filter = filterValue.trim().toLowerCase();

    if (this.table.paginator) {
      this.table.paginator.firstPage();
    }
  }

  async getData() {
    let user:any = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
    }
    (await this.enrollmentService.getEnrollmentsStudent(user.student_id)).subscribe(
      (data: any) => {
        this.table = data.enrollments;
        this.table.data = this.list;
      }
    )
  }
}
