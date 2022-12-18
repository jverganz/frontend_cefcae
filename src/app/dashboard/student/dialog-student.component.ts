import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StudentService } from "src/app/services/student.service";
import { TypeDocumentService } from "src/app/services/type_document.service";

@Component({
    selector: 'dialog-student',
    templateUrl: './dialog-student.component.html',
    styleUrls: []
})
export class DialogStudent {
    dialogForm: FormGroup;
    listState: any[] = [
        { value: 'ACTIVE', viewValue: 'ACTIVO' },
        { value: 'INACTIVE', viewValue: 'INACTIVO' },
    ];
    listDocuments: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<DialogStudent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private studentService: StudentService,
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

    get state(): any {
        return this.dialogForm.get('state');
    }

    closeModal() {
        this.dialogRef.close();
    }

    async create() {
        this.data.student = {
            user: {
                username: this.dialogForm.get("username")?.value,
                password: this.dialogForm.get("password")?.value,
                state: this.dialogForm.get("state")?.value,
            },
            student: {
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
        (await this.studentService.create(this.data.student)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    async update() {
        this.data.student = {
            user: {
                username: this.dialogForm.get("username")?.value,
                password: this.dialogForm.get("password")?.value,
                state: this.dialogForm.get("state")?.value,
                employee_id: this.data.student.user.student_id
            },
            student: {
                id: this.data.student.student.id,
                person_id: this.data.student.student.person_id,
                type_employee: this.dialogForm.get("type_employee")?.value,
                state: this.dialogForm.get("state")?.value,
            },
            person: {
                id: this.data.student.person.id,
                type_document_id: this.dialogForm.get("type_document")?.value,
                document_number: this.dialogForm.get("document_number")?.value,
                name: this.dialogForm.get("name")?.value,
                last_name: this.dialogForm.get("last_name")?.value,
                birth_date: this.dialogForm.get("birth_date")?.value
            }
        };
        (await this.studentService.update(this.data.student)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    initForm() {
        if (this.data.typeDialog === "EDIT") {
            this.dialogForm = new FormGroup({
                name: new FormControl(this.data.student.person.name, [Validators.required]),
                last_name: new FormControl(this.data.student.person.last_name, [Validators.required]),
                document_number: new FormControl(this.data.student.person.document_number, [Validators.required]),
                type_document: new FormControl(this.data.student.person.type_document_id, [Validators.required]),
                birth_date: new FormControl(this.data.student.person.birth_date, [Validators.required]),
                username: new FormControl(this.data.student.user.username, [Validators.required]),
                password: new FormControl(this.data.student.user.password, [Validators.required]),
                state: new FormControl(this.data.student.user.state, [Validators.required]),
            });
        } else {
            this.dialogForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                last_name: new FormControl('', [Validators.required]),
                document_number: new FormControl('', [Validators.required]),
                type_document: new FormControl('', [Validators.required]),
                birth_date: new FormControl('', [Validators.required]),
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