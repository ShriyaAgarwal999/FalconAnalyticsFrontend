import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { TestReportPassPercent } from '../models/testReportPassPercent.model';
import { TestcaseDetails } from '../models/testcaseDetails.model';
import { TestRunDetails } from '../models/testRunDetails.model';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  constructor(private http:HttpClient) { }


/*http request to get data from database using springBoot*/
  // public getTestPassPercent(product: string, noOfRuns: number, testphase:string) {
  //    return this.http.get<TestReportPassPercent>(environment.baseUrl + '/testReport/getTestphaseDetails?productName=' + product + "&noOfRuns=" + noOfRuns+"&testphase="+testphase);
  //   }

  //http request to get information about each testrun
  public getTestRunDetails(product: string, noOfRuns: number, testphase:string) {
       return this.http.get<TestRunDetails>(environment.baseUrl + '/testReport/getTestRunDetails?productName=' + product + "&noOfRuns=" + noOfRuns+"&testphase="+testphase);
  }

  /*http reuest to get history of test cases*/
  public getTestcaseHistory(customer: string, noOfRuns: number) {
    return this.http.get<TestcaseDetails[]>(environment.baseUrl + '/testCase/details?customerName=' + customer + "&noOfRuns=" + noOfRuns);
  }

  //*http reuest to get testcase wise comparision
  public getTestcaseComparision(customer: string, noOfRuns: number) {
      return this.http.get<Array<number>>(environment.baseUrl + '/testCase/testcaseCompare?customerName=' + customer + "&noOfRuns=" + noOfRuns);
  }

  public getProductNames(){
      return this.http.get<String[]>(environment.baseUrl + '/testReport/getAllProductNames');
  }

  public getThisTestRunDetails(product:string, testphase:string, runNumber:number, browser:string, os:string, status:string){
      return this.http.get<TestcaseDetails[]>(environment.baseUrl + '/testCase/getThisTestRunDetails?productName='+product+'&testphase='+testphase+'&runNumber='+runNumber+'&browser='+browser+'&os='+os+'&status='+status);
  }

}
