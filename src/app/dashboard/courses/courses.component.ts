import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// Services
import { CourseService } from 'src/app/services/courses.service';
import { DialogCourse } from './dialog-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: []
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'state', 'actions'];
  table: MatTableDataSource<any>;
  list: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private courseService: CourseService,
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
    (await this.courseService.getCourses()).subscribe(
      (data: any) => {
        this.table = data.courses;
        this.table.data = this.list;
      }
    )
  }

  openDialog(typeDialog: any, data: any) {
    let courseInfo = data;
    if (typeDialog === "CREATE") {
      courseInfo = {
        id: 0,
        name_headquarter: "",
        address: "",
        state: ""
      }
    }
    const dialogRef = this.dialog.open(DialogCourse, {
      data: { course: courseInfo, typeDialog: typeDialog },
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.ok) {
        this.openNotificationAction(typeDialog);
      } else {
        this.openNotificationAction("ERROR");
      }
    });
  }

  openNotificationAction(typeDialog: string) {
    let message = "";

    switch (typeDialog) {
      case "CREATE":
        message = "Se ha creado correctamente";
        break;
      case "EDIT":
        message = "Se ha actualizado correctamente";
        break;
      case "DELETE":
        message = "Se ha eliminado correctamente";
        break;
      default:
        message = "Ha ocurrido un error, por favor contacte con el administrador";
        break;
    }

    this.getData();

    this._snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }
}
