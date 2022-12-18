import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
    exports: [
        MatButtonModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatDividerModule,
        MatListModule,
        MatToolbarModule,
        MatListModule,
        MatPaginatorModule,
        MatSortModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule { }