export class TestcaseDetails {

  number:number;
  name:string;
  status: string;
  durationms:number;
  exceptionmessage: string;
  modulename:string;
  customername:string;
  browser:string;
  os:string;
  runsessionid: number;

  constructor(number: number,name: string, status: string,durationms:number, exceptionmessage: string, 
    modulename:string,customername:string,browser:string,os:string, runsessionid: number) {
      this.number = number;
      this.name = name;
    this.status = status;
    this.durationms=durationms;
    this.exceptionmessage = exceptionmessage;
    this.modulename=modulename;
    this.customername=customername;
    this.os=os;
    this.runsessionid = runsessionid;
    this.browser=browser;
  }

}
