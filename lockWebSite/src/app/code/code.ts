export class Code {
  id: number;
  codeVal: string;
  lockId: string;
  config: string;

  constructor(private lockId_param: string, private config_param: string, private id_param?: number) {
    if (id_param)
      this.id = id_param;
    this.lockId = lockId_param;
    this.config = config_param;
  }
}
