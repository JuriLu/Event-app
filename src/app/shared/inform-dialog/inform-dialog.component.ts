import {Component,Inject,OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-inform-dialog',
  templateUrl: './inform-dialog.component.html',
  styleUrls: ['./inform-dialog.component.scss']
})
export class InformDialogComponent {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any) { }

}
