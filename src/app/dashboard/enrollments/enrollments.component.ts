import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// Services
import { EnrollmentService } from 'src/app/services/enrollments.service';
import { DialogEnrollment } from './dialog-enrollment.component';


@Component({
    selector: 'app-enrollments',
    templateUrl: './enrollments.component.html',
    styleUrls: []
})
export class EnrollmentComponent implements OnInit {

    displayedColumns: string[] = ['course', 'student', 'method_payment', 'total', 'state', 'actions'];
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
        (await this.enrollmentService.getEnrollments()).subscribe(
            (data: any) => {
                this.table = data.enrollments;
                this.table.data = this.list;
            }
        )
    }

    openDialog(typeDialog: any, data: any) {
        let enrollmentInfo = data;
        if (typeDialog === "CREATE") {
            enrollmentInfo = {
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
        const dialogRef = this.dialog.open(DialogEnrollment, {
            data: { enrollment: enrollmentInfo, typeDialog: typeDialog },
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
