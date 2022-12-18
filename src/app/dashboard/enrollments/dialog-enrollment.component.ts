import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap } from "rxjs";
import { CourseService } from "src/app/services/courses.service";
import { EnrollmentService } from "src/app/services/enrollments.service";
import { HeadquarterService } from "src/app/services/headquarter.service";
import { StudentService } from "src/app/services/student.service";

@Component({
    selector: 'dialog-enrollment',
    templateUrl: './dialog-enrollment.component.html',
    styleUrls: []
})
export class DialogEnrollment implements OnInit {
    dialogForm: FormGroup;
    listState: any[] = [
        { value: 'ACTIVE', viewValue: 'ACTIVO' },
        { value: 'INACTIVE', viewValue: 'INACTIVO' },
        { value: 'TERMINATED', viewValue: 'TERMINADO' },
    ];
    listMethodPayment: any[] = [
        { value: 'EF', viewValue: 'EFECTIVO' },
        { value: 'TD', viewValue: 'TARJETA DÉBITO' },
        { value: 'TC', viewValue: 'TARJETA CRÉDITO' },
    ];
    listHeadquarter: any[] = [];
    listCourses: any[] = [];
    listStudents: any[] = [];

    controlHeadquarterAutoComplete = new FormControl('');
    filteredHeadquarters: Observable<any[]>;
    controlCoursesAutoComplete = new FormControl('');
    filteredCourses: Observable<any[]>;
    controlStudentsAutoComplete = new FormControl('');
    filteredStudents: Observable<any[]>;

    constructor(
        public dialogRef: MatDialogRef<DialogEnrollment>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private studentService: StudentService,
        private enrollmentService: EnrollmentService,
        private headquarterService: HeadquarterService,
        private courseService: CourseService
    ) {
        this.getCourses();
        this.getHeadquarters();
        this.getStudents();
        if (data.typeDialog === "CREATE" || data.typeDialog === "EDIT") {
            this.initForm();
        }
    }

    async ngOnInit() {
        this.filteredHeadquarters = this.controlHeadquarterAutoComplete.valueChanges.pipe(
            startWith(''),
            map((value:any) => {
                const id = typeof value === 'string' ? value : value?.id;
                return id ? this._filterHeadquarters(value || '') : this.listHeadquarter.slice()
            }),
        );

        this.filteredCourses = this.controlCoursesAutoComplete.valueChanges.pipe(
            startWith(''),
            map((value:any) => {
                const id = typeof value === 'string' ? value : value?.id;
                return id ? this._filterCourses(value || '') : this.listCourses.slice()
            }),
        );

        this.filteredStudents = this.controlStudentsAutoComplete.valueChanges.pipe(
            startWith(''),
            map((value:any) => {
                const id = typeof value === 'string' ? value : value?.id;
                return id ? this._filterStudent(value || '') : this.listStudents.slice()
            }),
        );
    }

    ngAfterViewInit() {
        
    }

    get method_payment(): any {
        return this.dialogForm.get('method_payment');
    }

    get total(): any {
        return this.dialogForm.get('total');
    }

    get state(): any {
        return this.dialogForm.get('state');
    }

    closeModal() {
        this.dialogRef.close();
    }

    async create() {
        this.data.enrollment = {
            total: this.dialogForm.get("total")?.value,
            method_payment: this.dialogForm.get("method_payment")?.value,
            state: this.dialogForm.get("state")?.value,
            student_id: this.controlStudentsAutoComplete.value,
            course_id: this.controlCoursesAutoComplete.value,
            headquarter_id: this.controlHeadquarterAutoComplete.value
        };
        (await this.enrollmentService.create(this.data.enrollment)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    async update() {
        this.data.enrollment = {
            total: this.dialogForm.get("total")?.value,
            method_payment: this.dialogForm.get("method_payment")?.value,
            state: this.dialogForm.get("state")?.value,
            student_id: this.data.enrollment.student_id,
            course_id: this.data.enrollment.course_id,
            headquarter_id: this.data.enrollment.headquarter_id
        };
        (await this.studentService.update(this.data.student)).subscribe(
            (data: any) => this.dialogRef.close(data),
            (error: any) => this.dialogRef.close(error)
        );
    }

    initForm() {
        if (this.data.typeDialog === "EDIT") {
            this.dialogForm = new FormGroup({
                total: new FormControl(this.data.enrollment.total, [Validators.required]),
                method_payment: new FormControl(this.data.enrollment.method_payment, [Validators.required]),
                state: new FormControl(this.data.enrollment.state, [Validators.required]),
            });
        } else {
            this.dialogForm = new FormGroup({
                total: new FormControl('', [Validators.required]),
                method_payment: new FormControl('', [Validators.required]),
                state: new FormControl('', [Validators.required])
            });
        }
    }

    async getHeadquarters() {
        (await this.headquarterService.getHeadquarters()).subscribe(
            (data: any) => {
                if (data.ok) {
                    this.listHeadquarter = data.headquarters;
                }
            }
        )
    }

    async getCourses() {
        (await this.courseService.getCourses()).subscribe(
            (data: any) => {
                if (data.ok) {
                    this.listCourses = data.courses;
                }
            }
        )
    }

    async getStudents() {
        (await this.studentService.getStudents()).subscribe(
            (data: any) => {
                if (data.ok) {
                    this.listStudents = data.students;
                }
            }
        )
    }

    private _filterHeadquarters(value: string): any[] {
        const filterValue = value.toLowerCase();

        return this.listHeadquarter.filter(headquarter => headquarter.name_headquarter.toLowerCase().includes(filterValue));
    }

    private _filterCourses(value: string): any[] {
        const filterValue = value.toLowerCase();

        return this.listCourses.filter(courses => courses.name.toLowerCase().includes(filterValue));
    }

    private _filterStudent(value: string): any[] {
        const filterValue = value.toLowerCase();

        return this.listStudents.filter(student => student.person.document_number.toLowerCase().includes(filterValue));
    }
}