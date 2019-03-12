export class TestcaseDetails {
  name:string;
  status: string;
  exceptionmessage: string;
  runsessionid: number;
  number: number;
  runNumber: number;

  constructor(name: string, status: string, exceptionmessage: string, runsessionid: number, number: number, runNumber: number) {
    this.name = name;
    this.status = status;
    this.exceptionmessage = exceptionmessage;
    this.runsessionid = runsessionid;
    this.number = number;
    this.runNumber= runNumber;
  }
  get getNumber(): number {
    return this.number;
  }
  set setNumber(number: number) {
    this.number = number;
  }
  set setRunNumber(runNumber: number) {
    this.runNumber = runNumber;
  }

}
