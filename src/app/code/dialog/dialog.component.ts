import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CodeService } from '../code.service';

@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    private codeService: CodeService,
    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.codeService.form.valid) {
      if (!this.codeService.form.get('id').value)
        this.codeService.generateNewCode().subscribe(() => {
          this.codeService.listChangedToggle();
        });
      else
        this.codeService.editCode().subscribe(() => {
          this.codeService.listChangedToggle();
        });
      this.codeService.form.reset();
      this.codeService.initializeFormGroup();
      this.onClose();
    }
  }

  onClear() {
    this.codeService.form.reset();
    this.codeService.initializeFormGroup();
  }

  onClose() {
    this.codeService.form.reset();
    this.codeService.initializeFormGroup();
    this.dialogRef.close();
  }
}
