import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';

import { Code } from './code';
import { CodeService } from './code.service';
import { DialogComponent } from './dialog/dialog.component';
import { AuthenticationService } from '../user/authentication.service';

@Component({
  templateUrl: 'code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {

  loading = false;
  listData: MatTableDataSource<Code> = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'codeVal', 'lockId', 'actions'];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private codeService: CodeService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.codeService.list_changed.subscribe(() => {
      this.codeService.getCodes().subscribe(codes => {
        if (codes)
          this.listData.data = codes;
      });
    });
    this.getExistingCodes();
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
  }

  getExistingCodes() {
    this.loading = true;
    this.codeService.getCodes().subscribe(codes => {
      if (codes)
        this.listData.data = codes;
      else
        this.listData.data = [];
      this.loading = false;
    });
  }

  generateNewCode() {
    this.codeService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(DialogComponent, dialogConfig);
  }

  editCode(code: Code) {
    this.codeService.populateForm(code);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(DialogComponent, dialogConfig);
  }

  deleteCode(code: Code) {
    this.codeService.delteCode(code).subscribe(() => {
      this.getExistingCodes();
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
