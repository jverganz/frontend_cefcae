import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CourseService } from "src/app/services/courses.service";

@Component({
    selector: 'dialog-course',
    templateUrl: './dialog-course.component.html',
    styleUrls: []
})
export class DialogCourse {
    dialogForm: FormGroup;
    listState: any[] = [
        {value: 'ACTIVE', viewValue: 'ACTIVO'},
        {value: 'INACTIVE', viewValue: 'INACTIVO'},
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogCourse>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private courseService: CourseService
    ) {
        if (data.typeDialog === "CREATE" || data.typeDialog === "EDIT") {
            this.initForm();
        }
    }

    get name(): any {
        return this.dialogForm.get('name');
    }

    get state(): any {
        return this.dialogForm.get('state');
    }

    closeModal() {
        this.dialogRef.close();
    }

    async create() {
        this.data.course = this.dialogForm.value;
        (await this.courseService.create(this.data.course)).subscribe(
            (data:any) => this.dialogRef.close(data),
            (error:any) => this.dialogRef.close(error)
        );
    }

    async update() {
        this.data.course = { id: this.data.course.id, ...this.dialogForm.value };
        (await this.courseService.update(this.data.course)).subscribe(
            (data:any) => this.dialogRef.close(data),
            (error:any) => this.dialogRef.close(error)
        );
    }

    initForm() {
        if (this.data.typeDialog === "EDIT") {
            this.dialogForm = new FormGroup({
                name: new FormControl(this.data.course.name, [ Validators.required]),
                state: new FormControl(this.data.course.state, [ Validators.required]),
            });
        } else {
            this.dialogForm = new FormGroup({
                name: new FormControl('', [ Validators.required]),
                state: new FormControl('', [ Validators.required]),
            });
        }
    }
}