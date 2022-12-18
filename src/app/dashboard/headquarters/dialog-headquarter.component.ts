import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeadquarterService } from "src/app/services/headquarter.service";

@Component({
    selector: 'dialog-headquarter',
    templateUrl: './dialog-headquarter.component.html',
    styleUrls: []
})
export class DialogHeadquarter {
    headquarterForm: FormGroup;
    listState: any[] = [
        {value: 'ACTIVE', viewValue: 'ACTIVO'},
        {value: 'INACTIVE', viewValue: 'INACTIVO'},
    ];

    constructor(
        public dialogRef: MatDialogRef<DialogHeadquarter>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private headquarterService: HeadquarterService
    ) {
        if (data.typeDialog === "CREATE" || data.typeDialog === "EDIT") {
            this.initForm();
        }
    }

    get name_headquarter(): any {
        return this.headquarterForm.get('name_headquarter');
    }

    get address(): any {
        return this.headquarterForm.get('address');
    }

    get state(): any {
        return this.headquarterForm.get('state');
    }

    closeModal() {
        this.dialogRef.close();
    }

    async createHeadquarter() {
        this.data.headquarter = this.headquarterForm.value;
        this.data.headquarter.institute_id = localStorage.getItem("id_institute");
        (await this.headquarterService.createHeadquarter(this.data.headquarter)).subscribe(
            (data:any) => this.dialogRef.close(data),
            (error:any) => this.dialogRef.close(error)
        );
    }

    async updateHeadquarter() {
        this.data.headquarter = { id: this.data.headquarter.id, ...this.headquarterForm.value };
        (await this.headquarterService.updateHeadquarter(this.data.headquarter)).subscribe(
            (data:any) => this.dialogRef.close(data),
            (error:any) => this.dialogRef.close(error)
        );
    }

    initForm() {
        if (this.data.typeDialog === "EDIT") {
            this.headquarterForm = new FormGroup({
                name_headquarter: new FormControl(this.data.headquarter.name_headquarter, [ Validators.required]),
                address: new FormControl(this.data.headquarter.address, [ Validators.required]),
                state: new FormControl(this.data.headquarter.state, [ Validators.required]),
            });
        } else {
            this.headquarterForm = new FormGroup({
                name_headquarter: new FormControl('', [ Validators.required]),
                address: new FormControl('', [ Validators.required]),
                state: new FormControl('', [ Validators.required]),
            });
        }
    }
}