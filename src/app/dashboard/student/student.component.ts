import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// Services
import { DialogStudent } from './dialog-student.component';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
export class StudentComponent implements OnInit {

  displayedColumns: string[] = ['name', 'last_name', 'username', 'state', 'actions'];
  table: MatTableDataSource<any>;
  list: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private studentService: StudentService,
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
    (await this.studentService.getStudents()).subscribe(
      (data: any) => {
        this.table = data.students;
        this.table.data = this.list;
      }
    )
  }

  openDialog(typeDialog: any, data: any) {
    let studentInfo = data;
    if (typeDialog === "CREATE") {
      studentInfo = {
        user: {
          username: "",
          password: "",
          state: ""
        },
        student: {
          state: ""
        },
        person: {
          type_document_id: 0,
          document_number: 0,
          name: "",
          last_name: "",
          birth_date: ""
        }
      }
    }
    const dialogRef = this.dialog.open(DialogStudent, {
      data: { student: studentInfo, typeDialog: typeDialog },
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
