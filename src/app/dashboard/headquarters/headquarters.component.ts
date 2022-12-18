import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

// Services
import { HeadquarterService } from 'src/app/services/headquarter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogHeadquarter } from './dialog-headquarter.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-headquarters',
    templateUrl: './headquarters.component.html',
    styleUrls: []
})
export class HeadquarterComponent implements OnInit {

    displayedColumns: string[] = ['name', 'address', 'state', 'actions'];
    tableHeadquarters: MatTableDataSource<any>;
    listHeadquarter: any[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private headquarterService: HeadquarterService,
        public dialog: MatDialog,
        private _snackBar: MatSnackBar
    ) {
        this.tableHeadquarters = new MatTableDataSource(this.listHeadquarter);
    }

    async ngOnInit() {
        this.getHeadquarters();
    }

    ngAfterViewInit() {
        this.tableHeadquarters.paginator = this.paginator;
        this.tableHeadquarters.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tableHeadquarters.filter = filterValue.trim().toLowerCase();

        if (this.tableHeadquarters.paginator) {
            this.tableHeadquarters.paginator.firstPage();
        }
    }

    async getHeadquarters() {
        (await this.headquarterService.getHeadquarters()).subscribe(
            (data: any) => {
                this.listHeadquarter = data.headquarters;
                this.tableHeadquarters.data = this.listHeadquarter;
            }
        )
    }

    openDialog(typeDialog: any, headquarter: any) {
        let headquarterInfo = headquarter;
        if (typeDialog === "CREATE") {
            headquarterInfo = {
                id: 0,
                name_headquarter: "",
                address: "",
                state: ""
            }
        }
        const dialogRef = this.dialog.open(DialogHeadquarter, {
            data: { headquarter: headquarterInfo, typeDialog: typeDialog },
            width: '40%'
        });

        dialogRef.afterClosed().subscribe((result:any) => {
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
    
        this.getHeadquarters();
    
        this._snackBar.open(message, 'Cerrar', {
            duration: 3000
        });
    }
}
