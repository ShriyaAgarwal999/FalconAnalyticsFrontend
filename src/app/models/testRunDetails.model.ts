export class TestRunDetails{

    constructor(public totalcount: Array<number>,public passcount: Array<number>, public failcount: Array<number>, public skipcount: Array<number>,public passPercent: Array<number>, public totalRuns:number){
    }
  }