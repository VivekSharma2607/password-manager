import { Component, OnInit , ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud';
  displayedColumns: string[] = ['appname' , 'password' , 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog , private api : ApiService){

  }
  ngOnInit(): void {
    this.getpass()
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width : '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'Save'){
        this.getpass()
      }
    })
  }
  getpass(){
    this.api.getpass()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.getpass()
      },
      error:(err)=>{
        alert("Error while displaying the resutls !");
      }
    })
  }
  editpass(row:any){
    this.dialog.open(DialogComponent , {
      width:'30%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getpass()
      }
    })
  }
  deletePass(id:number) {
    this.api.deletepass(id)
    .subscribe({
      next:(res) => {
        alert("Product Deleted Successfully")
        this.getpass()
      },
      error:()=>{
        alert("Error while Deleting the Password")
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
