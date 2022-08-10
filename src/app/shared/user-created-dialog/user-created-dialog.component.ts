import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-user-created-dialog',
  templateUrl: './user-created-dialog.component.html',
  styleUrls: ['./user-created-dialog.component.scss']
})
export class UserCreatedDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
