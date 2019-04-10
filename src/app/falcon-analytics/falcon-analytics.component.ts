import { Component,OnInit, ViewChild } from '@angular/core';
import { TestReportService } from '../services/testReport.services';
import { TestReportPassPercent } from '../models/testReportPassPercent.model';
import { environment } from '../../environments/environment';
import { TestcaseDetails } from '../models/testcaseDetails.model';
import { MatRadioChange, MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { TestRunDetails } from '../models/testRunDetails.model';

@Component({
  selector: 'app-falcon-analytics',
  templateUrl: './falcon-analytics.component.html',
  styleUrls: ['./falcon-analytics.component.css']
})
export class FalconAnalyticsComponent implements OnInit {
  smokePassPercent=environment.smokePassPercent;
  regressionPassPercent=environment.regressionPassPercent;
    refresh:boolean=false;
    toggleViewHistory=false;

    results:Array<string>;
    location:number;
    
    myControl = new FormControl();
    options: String[] = [];
    filteredOptions: Observable<String[]>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    productNamesAll:Array<String>;
    testphase=['Smoke','Regression'];
    selectedTestphase:string;
    runNumber:number;
    numbers:Array<number>=[];
    showDetails:boolean=false;
    hideDetails:boolean=true;

    columnsToDisplay = ['testcaseNumber','duration','browser','os', 'status'];
    datasource: MatTableDataSource<TestcaseDetails>;
    testcaseDetails: Array<TestcaseDetails>;
    noOfRuns: number=50;
    viewDetailsButton: boolean = false;
    compareTestcaseUpdated: boolean = false;
    compareTestcase: Array<number>;
    showComparisionChart: boolean = false;
    chartDetailsUpdated: boolean=false;
    showMainChart: boolean = false;

   
    browsers=["All","chrome_53","Mozilla-firefox","Microsoft-edge"];
    os=["All","WIN_7","Linux","Mac"];
    status=["All","PASS","FAIL"];
    selectedBrowser:string;
    selectedOs:string;
    selectedStatus:string;
    showtable:boolean=false;
    updateTable:boolean=false;
    browserIsDisabled:boolean=true;
    osIsDisabled:boolean=true;
    runs:Array<number>;
    
    dropdownValue:string="choose product";

    disableCharts:boolean=true;
    runsIsDisabled:boolean=true;
    isDisabled: boolean=true;
    chartDataTemp=[];
    chartLabelsTemp=[];
    chartData;
    chartLabels: Array<number>;
    testcaseChartData: Array<number>;
    testcaseChartLabels: Array<number>=[];
    testcaseChartOptions = {
      scaleShowVerticalLines: false,
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Pass Percentage',
            fontSize: 16,
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Testcase number',
            fontSize: 16,
          }
        }]
      }
    };

    // showBar = "hidden";
    // showPie = "hidden";
    showChart = "hidden";
    showDiv: boolean = false;

    //bar chart details
    testrun: TestRunDetails;
    totalcount:Array<number>=[];
    passcount:Array<number>=[];
    failcount:Array<number>=[];
    skipcount:Array<number>=[];
    totalRuns:number;

    report: TestReportPassPercent;
    chartType1 =environment.chartType1;
    barChartLegend =true;
    // public locationGo;
    // public locationNoGo;
    // chartDataGo=[];
    // chartDataNoGo=[];
    goData;
    noGoData;
    chartDataShown=[];
    chartLocation;
    chartDatasets=[];
    barChartOptions;
    colors;
    runId=[];
    // chartColors=[];
    // colors=[{
    //   backgroundColor:[],
    // }];
   

    //pie chart details
    chartType2=environment.chartType2;
    pieChartData;
    pieChartLabels;
    pieChartDetailsUpdated=false;
    pieChartColors;
    pieChartOptions = {
    responsive: true,
    title: {
      text:'Representation of Go% Vs NoGO%',
      display: true,
      fontSize:18,
      },
      legend: {
        display: true,
        position: 'top'
      }};
  
     ngOnInit() {
        this.reportService.getProductNames()
        .subscribe(data =>{
          this.options=data;   
        });
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }

      constructor( private reportService:TestReportService) {
      }

      private _filter(value: String): String[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
      }  
      
//function to display info about each run in a testcase
showDetailsOfTestrun(event: MatRadioChange){
  this.chartLabels=[];
  this.refresh=false;
  this.totalcount=[];
  this.passcount=[];
  this.failcount=[];
  this.skipcount=[];
  this.runs=[];
  this.goData=0;
  this.noGoData=0;
  this.location=0;
  this.results=[];
  console.log(this.dropdownValue,this.selectedBrowser,this.selectedOs,this.selectedStatus);
  this.reportService.getTestRunDetails(this.dropdownValue, this.noOfRuns, this.selectedTestphase)
      .subscribe(data => {
        this.testrun = data;
        this.chartDetailsUpdated = true;
        this.pieChartDetailsUpdated=true;
        this.totalcount=this.testrun.totalcount;
        this.passcount=this.testrun.passcount;
        this.failcount=this.testrun.failcount;
        this.skipcount=this.testrun.skipcount;
        this.totalRuns=this.testrun.totalRuns;
        for (var i = 0; i < this.totalcount.length; i++) {
            this.chartLabels.push(i+1);
            this.runs[i]=i+1;
        }
                 

         this.chartData = [
         {data: this.testrun.passcount, label: 'Passed'},
         {data: this.testrun.failcount, label: 'Failed'},
         {data: this.testrun.skipcount, label: 'Skipped'}
          ];
                this.colors=[{
                  backgroundColor:"rgba(135, 211, 124, 1)",
                },
                {
                  backgroundColor : "rgba(214, 69, 65, 1)"
                } ,
                {
                  backgroundColor : "rgba(250, 190, 88, 1)"
                } 
                ];
                for(var element=0; element<this.testrun.totalcount.length;element++){
                  if(this.selectedTestphase=="Regression" && this.testrun.passPercent[element]>=95){
                     this.goData++;
                     if(this.location<5)
                      this.results[this.location]='GO';
                      this.location++;
                  }
                  else if(this.selectedTestphase=="Smoke" && this.testrun.passPercent[element]==100){
                    this.goData++;
                    if(this.location<5)
                      this.results[this.location]='GO';
                      this.location++;
                  }
                  else{
                    this.noGoData++;
                    if(this.location<5)
                      this.results[this.location]='NO GO';
                      this.location++;
                  }
                  console.log(this.results[this.location]);
                }
                var goDataPercent=(this.goData/(this.goData+this.noGoData))*100;
                var noGoDataPercent=(this.noGoData/(this.goData+this.noGoData))*100;
                console.log(this.goData);
                this.pieChartData=[goDataPercent,noGoDataPercent];
                this.pieChartLabels=['Go','NO Go'];
                this.pieChartColors=[{
                  backgroundColor:['rgba(135, 211, 124, 1)','rgba(214, 69, 65, 1)']
                }];
                this.barChartOptions = {
                //   tooltips: {
                //     callbacks: {
                //         label: function(tooltipItem,data) {
                //             return "Total testcases="+this.tooltipItem
                //           }
                //     }
                // },
               // events: ['click'],
               // click:this.onBarChartClick,
                  scaleShowVerticalLines: false,                
                  scales: {
                    yAxes: [{
                      stacked:true,
                      scaleLabel: {
                      display: true,
                      labelString: 'Number of Testcases',
                      fontSize:16,
                      }
                    }],
                    xAxes: [{
                      stacked:true,
                      scaleLabel: {
                      display: true,
                      labelString: 'Run number',
                      fontSize:16,
                    }
                  }]
                  }
                };
      });
      this.chartDetailsUpdated = false;
      this.pieChartDetailsUpdated=false;
      this.showMainChart = false;
 }



  getThisTestRunDetails(event){
    this.showMainChart = true;
    this.viewDetailsButton = true; 
    this.showtable=true;
    // for(var i=1;i<=50;i++){
    //   this.runs[i]=i;
    // }
    this.reportService.getThisTestRunDetails(this.dropdownValue, this.selectedTestphase,
       this.runNumber,this.selectedBrowser,this.selectedOs, this.selectedStatus)
    .subscribe(data => {
      this.updateTable=true;
      this.testcaseDetails = data;
      console.log(this.selectedStatus);
      console.log(this.selectedOs);
      this.datasource = new MatTableDataSource<TestcaseDetails>(this.testcaseDetails);
       this.datasource.paginator = this.paginator;   
  });
  this.updateTable=false;
}
}
