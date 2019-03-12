import { Component, ViewChild, ElementRef } from '@angular/core';
import { TestReportService } from '../services/testReport.services';
import { TestReportPassPercent } from '../models/testReportPassPercent.model';
import { environment } from '../../environments/environment';
import { TestcaseDetails } from '../models/testcaseDetails.model';

@Component({
  selector: 'app-falcon-analytics',
  templateUrl: './falcon-analytics.component.html',
  styleUrls: ['./falcon-analytics.component.css']
})
export class FalconAnalyticsComponent{

    @ViewChild('productName') productRef: ElementRef;
    testcaseDetails: Array<TestcaseDetails>;
    noOfRuns: number = 5;
    viewDetailsButton: boolean = false;
    compareTestcaseUpdated: boolean = false;
    compareTestcase: Array<number>;
    showComparisionChart: boolean = false;
    chartDetailsUpdated: boolean=false;
    showMainChart: boolean = false;
    dropdownValue:string="-----Select-----";
  public chartData: Array<number>;
    public chartLabels: Array<number>;
    public testcaseChartData: Array<number>;
    public testcaseChartLabels: Array<number>=[1,2,3,4,5];
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

    showBar = "hidden";
    showPie = "hidden";
    showChart = "hidden";
    showDiv: boolean = false;

    public report: TestReportPassPercent;
    public chartType1 =environment.chartType1;
    public barChartLegend =false;
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
        position: 'bottom'
      }};

  constructor(private reportService:TestReportService) {
  }

   /*function to subscribe to the database to retrieve required data*/
  submitProductName(product: string) {
    this.dropdownValue = product;
    this.chartLabels = [];
    this.reportService.getTestPassPercent(product, this.noOfRuns)
      .subscribe(data => {
        this.report = data;
        this.chartDetailsUpdated = true;
        console.log(this.report.passPercent);
        console.log(this.report.runSessionId);
        this.chartData = this.report.passPercent;
        //this.chartLabels = this.report.runSessionId;
      });
    for (var i = 0; i < this.noOfRuns; i++) {
      this.chartLabels.push(i+1);
    }
    this.chartDetailsUpdated = false;
    this.showMainChart = false;
  }

  showBarChart() {
    this.showBar = null;
    this.showPie = "hidden";
  }
  showPieChart() {
    this.showPie = null;
    this.showBar = "hidden";
  }

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


  //function to compare testcases in different runs
  showTestcaseComparision(customer: string) {
    this.showChart = null;
    this.showComparisionChart = true;
    this.reportService.getTestcaseComparision(customer, this.noOfRuns)
      .subscribe(data => {
        this.compareTestcaseUpdated = true;
        this.compareTestcase = data;
        console.log(this.compareTestcase);
        this.testcaseChartData = this.compareTestcase;
      });  
    this.compareTestcaseUpdated = false;
  }
}
