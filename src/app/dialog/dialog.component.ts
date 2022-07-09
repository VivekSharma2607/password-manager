import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef  , MAT_DIALOG_DATA} from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  hide = true
  passwordForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder , private api : ApiService , private dialogref : MatDialogRef<DialogComponent> , @Inject(MAT_DIALOG_DATA) public editData: any) { }
  

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group ({
      appname : ['' , Validators.required],
      password : ['' , Validators.required]
    })
    if(this.editData){
      this.actionBtn = "Update"
      this.passwordForm.controls['appname'].setValue(this.editData.appname)
      this.passwordForm.controls['password'].setValue(this.editData.password)
    }
  }
  addPass(){
    if(!this.editData){
      if(this.passwordForm.valid){
        this.api.postpass(this.passwordForm.value)
        .subscribe({
          next:(res)=>{
            alert("Password is added successfully")
            this.passwordForm.reset()
            this.dialogref.close('Data Saved Succesfully')
          },
          error:()=>{
            alert("Password while storing in the Database")
          }
        })
      }
    }
    else{
      this.update()
    }
  }
  update(){
    this.api.updatepass(this.passwordForm.value , this.editData.id)
    .subscribe({
      next:(res)=>{
        alert("Password Updated Successfully")
        this.passwordForm.reset;
        this.dialogref.close('update')
      },
      error:()=>{
        alert("Error while updating")
      }
    })
  }
}
