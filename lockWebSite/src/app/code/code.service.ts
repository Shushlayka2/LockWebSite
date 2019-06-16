import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Code } from './code';

@Injectable({ providedIn: 'root' })
export class CodeService {

  codeUrl = 'https://lockserverapi.azurewebsites.net/api/code/';

  @Output() list_changed = new EventEmitter();

  listChangedToggle() {
    this.list_changed.emit();
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    codeVal: new FormControl(''),
    lockId: new FormControl('', Validators.required),
    config: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient) { }

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      codeVal: '',
      lockId: '',
      config: ''
    });
  }

  populateForm(code) {
    this.form.setValue(code);
  }

  getCodes(): Observable<Code[]> {
    return this.http.get<Code[]>(this.codeUrl + 'getcodes');
  }

  generateNewCode() {
    return this.http.post<Code[]>(this.codeUrl + 'generatecode', new Code(this.form.get('lockId').value, this.form.get('config').value));
  }

  editCode() {
    return this.http.post<Code[]>(this.codeUrl + 'editcode', new Code(this.form.get('lockId').value, this.form.get('config').value, this.form.get('id').value));
  }

  delteCode(code: Code) {
    return this.http.post<Code[]>(this.codeUrl + 'removecode', code);
  }
}
