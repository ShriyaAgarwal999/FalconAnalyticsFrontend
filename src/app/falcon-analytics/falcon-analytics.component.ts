import { Component } from '@angular/core';
import { TestReportService } from '../services/testReport.services';
import { TestReportPassPercent } from '../models/testReportPassPercent.model';
import { environment } from '../../environments/environment';
import { TestcaseDetails } from '../models/testcaseDetails.model';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-falcon-analytics',
  templateUrl: './falcon-analytics.component.html',
  styleUrls: ['./falcon-analytics.component.css']
})
export class FalconAnalyticsComponent{
    toggleViewHistory=false;

    productNames=['Uber','Amazon','Flipkart'];
    testphase=['Smoke','Regression'];
    selectedTestphase:string;
    runNumber:number;
    numbers:Array<number>=[];
    showDetails:boolean=false;
    hideDetails:boolean=true;

    testcaseDetails: Array<TestcaseDetails>;
    noOfRuns: number=50;
    viewDetailsButton: boolean = false;
    compareTestcaseUpdated: boolean = false;
    compareTestcase: Array<number>;
    showComparisionChart: boolean = false;
    chartDetailsUpdated: boolean=false;
    showMainChart: boolean = false;

dropdownValue:string="choose product";
    
    disableCharts:boolean=true;
    runsIsDisabled:boolean=true;
    isDisabled: boolean=true;
    public chartDataTemp=[];
    public chartLabelsTemp=[];
    public chartData=[];
    public chartLabels: Array<number>;
    public testcaseChartData: Array<number>;
    public testcaseChartLabels: Array<number>=[];
    public testcaseChartOptions = {
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
    public report: TestReportPassPercent;
    public chartType1 =environment.chartType1;
    public barChartLegend =true;
    public chartColors=[];
    public colors=[{
      backgroundColor:[],
    }];
    public chartDatasets=[{}];
    public barChartOptions = {
      scaleShowVerticalLines: false,
      scales: {
        yAxes: [{
        scaleLabel: {
        display: true,
        labelString: 'Run Pass Percentage',
        fontSize:16,
        }
        }],
        xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Run number',
        fontSize:16,
      }
      }]
      }
    };

    //pie chart details
    public chartType2=environment.chartType2;
    public pieChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Pass Percentage of last runs',
      fontSize:18,
      },
      legend: {
        display: true,
        position: 'right'
      }};

  constructor(private reportService:TestReportService) {}

   /*function to subscribe to the database to retrieve required data*/
  submitProductName(event: MatRadioChange) {
    this.chartLabels=[];
    this.reportService.getTestPassPercent(this.dropdownValue, this.noOfRuns, this.selectedTestphase)
      .subscribe(data => {
        this.report = data;
        this.chartDetailsUpdated = true;
        this.chartData = this.report.passPercent;
        this.chartLabels = this.report.runSessionId; 
        for(var element=0; element<this.chartLabels.length;element++){
          if(this.chartLabels[element]==0){
            this.chartLabels.splice(element, 1);
            this.chartData.splice(element,1);
            element--;
            console.log(element);
          }
          else{
          if(this.selectedTestphase=="Regression" && parseInt(this.chartData[element],10)>=95){
            this.chartColors[element]="rgba(46, 204, 113, 1)";  
          }
          else if(this.selectedTestphase=="Smoke" && parseInt(this.chartData[element],10)>=100){
            this.chartColors[element]="rgba(46, 204, 113, 1)";
          }
          else{    
            this.chartColors[element]="rgba(255, 0, 0, 1)";
          }
          }
          }
            this.chartDatasets=[{
              data:this.chartData,
              label:"No GO",
              
            },
          {
            data:null,
            label:"GO",
            strokeColor : "rgba(46, 204, 113, 1)", 
          }]; 
           this.colors=[{
            backgroundColor:this.chartColors,
            }];
      });
      
      for (var i = 0; i < this.noOfRuns; i++) {
        this.chartLabels.push(i+1);
      }
    this.chartDetailsUpdated = false;
    this.showMainChart = false;
  }

  // showBarChart() {
  //   this.showBar = null;
  //   this.showPie = "hidden";
  // }
  // showPieChart() {
  //   this.showPie = null;
  //   this.showBar = "hidden";
  // }

  /*show details if view history button is clicked*/
  showHistory(customer:string) {
    this.showMainChart = true;
    this.viewDetailsButton = true; 
    var maxRun = this.noOfRuns;
    var runValue = maxRun;
    this.reportService.getTestcaseHistory(customer, this.noOfRuns)
      .subscribe(data => {
        this.testcaseDetails = data;
        //assign test run number according to the number of runs entered
        this.testcaseDetails.forEach(function(value) {
          value.runNumber = runValue--;
          if (runValue < 1)
            runValue = maxRun;
        });
        console.log(this.testcaseDetails);
      });
  }
  
  //*function to compare testcases in different runs
  showTestcaseComparision(customer: string) {
    this.showChart = null;
    this.showComparisionChart = true;
    this.reportService.getTestcaseComparision(customer, this.noOfRuns)
      .subscribe(data => {
        this.compareTestcaseUpdated = true;
        this.compareTestcase = data;
        console.log(this.compareTestcase);
        this.testcaseChartData = this.compareTestcase;
        for (var i = 1; i <= this.compareTestcase.length ; i++) {
          this.testcaseChartLabels.push(i);
        } 
      });  
      
    this.compareTestcaseUpdated = false;
  }
}
