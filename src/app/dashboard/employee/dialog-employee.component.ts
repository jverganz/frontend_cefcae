import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { EmployeesService } from "src/app/services/employees.service";
import { TypeDocumentService } from "src/app/services/type_document.service";

@Component({
    selector: 'dialog-employee',
    templateUrl: './dialog-employee.component.html',
    styleUrls: []
})
export class DialogEmployee {
    dialogForm: FormGroup;
    listState: any[] = [
        { value: 'ACTIVE', viewValue: 'ACTIVO' },
        { value: 'INACTIVE', viewValue: 'INACTIVO' },
    ];
    listTypeEmployee: any[] = [
        { value: 'ADMIN', viewValue: 'ADMIN' },
        { value: 'PROFFESSOR', viewValue: 'PROFFESSOR' },
    ];
    listDocuments: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<DialogEmployee>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private employeeService: EmployeesService,
        private typeDocumentService: TypeDocumentService
    ) {
        this.getTypesDocument();
        if (data.typeDialog === "CREATE" || data.typeDialog === "EDIT") {
            this.initForm();
        }
    }

    get type_document(): any {
        return this.dialogForm.get('type_document');
    }

    get document_number(): any {
        return this.dialogForm.get('document_number');
    }

    get name(): any {
        return this.dialogForm.get('name');
    }

    get last_name(): any {
        return this.dialogForm.get('last_name');
    }

    get username(): any {
        return this.dialogForm.get('username');
    }

    get birth_date(): any {
        return this.dialogForm.get('birth_date');
    }

    get password(): any {
        return this.dialogForm.get('password');
    }

    get type_employee(): any {
        return this.dialogForm.get('type_employee');
    }

    get state(): any {
        return this.dialogForm.get('state');
    }

    closeModal() {
        this.dialogRef.close();
    }

    async create() {
        this.data.employee = {
            user: {
                username: this.dialogForm.get("username")?.value,
                password: this.dialogForm.get("password")?.value,
                state: this.dialogForm.get("state")?.value,
            },
            employee: {
                type_employee: this.dialogForm.get("type_employee")?.value,
                state: this.dialogForm.get("state")?.value,
            },
            person: {
                type_document_id: this.dialogForm.get("type_document")?.value,
                document_number: this.dialogForm.get("document_number")?.value,
                name: this.dialogForm.get("name")?.value,
                last_name: this.dialogForm.get("last_name")?.value,
                birth_date: this.dialogForm.get("birth_date")?.value
            }
        };
        (await this.employeeService.create(this.data.employee)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    async update() {
        this.data.employee = {
            user: {
                username: this.dialogForm.get("username")?.value,
                password: this.dialogForm.get("password")?.value,
                state: this.dialogForm.get("state")?.value,
                employee_id: this.data.employee.user.employee_id
            },
            employee: {
                id: this.data.employee.employee.id,
                person_id: this.data.employee.employee.person_id,
                type_employee: this.dialogForm.get("type_employee")?.value,
                state: this.dialogForm.get("state")?.value,
            },
            person: {
                id: this.data.employee.person.id,
                type_document_id: this.dialogForm.get("type_document")?.value,
                document_number: this.dialogForm.get("document_number")?.value,
                name: this.dialogForm.get("name")?.value,
                last_name: this.dialogForm.get("last_name")?.value,
                birth_date: this.dialogForm.get("birth_date")?.value
            }
        };
        (await this.employeeService.update(this.data.employee)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    initForm() {
        if (this.data.typeDialog === "EDIT") {
            this.dialogForm = new FormGroup({
                name: new FormControl(this.data.employee.person.name, [Validators.required]),
                last_name: new FormControl(this.data.employee.person.last_name, [Validators.required]),
                document_number: new FormControl(this.data.employee.person.document_number, [Validators.required]),
                type_document: new FormControl(this.data.employee.person.type_document_id, [Validators.required]),
                birth_date: new FormControl(this.data.employee.person.birth_date, [Validators.required]),
                type_employee: new FormControl(this.data.employee.employee.type_employee, [Validators.required]),
                username: new FormControl(this.data.employee.user.username, [Validators.required]),
                password: new FormControl(this.data.employee.user.password, [Validators.required]),
                state: new FormControl(this.data.employee.user.state, [Validators.required]),
            });
        } else {
            this.dialogForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                last_name: new FormControl('', [Validators.required]),
                document_number: new FormControl('', [Validators.required]),
                type_document: new FormControl('', [Validators.required]),
                birth_date: new FormControl('', [Validators.required]),
                type_employee: new FormControl('', [Validators.required]),
                username: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                state: new FormControl('', [Validators.required]),
            });
        }
    }

    async getTypesDocument() {
        (await this.typeDocumentService.getTypeDocuments()).subscribe(
            (data: any) => {
                if (data.ok) {
                    this.listDocuments = data.typesDocuments;
                }
            }
        )
    }
}