import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

public pieChartLabels: string[] = [];
public pieChartCharactersData: number[] = [];
public pieChartPlanetsData: number[] = [];
public pieChartType = 'pie';
constructor(private appService: AppService) {}

ngOnInit() {
  this.appService.getFilms()
    .subscribe(response => {
      console.log(response);
      for (const item of response) {
        console.log(this.pieChartCharactersData);
        this.pieChartLabels.push(item.title);
        this.pieChartCharactersData.push(item.characters.length);
        this.pieChartPlanetsData.push(item.planets.length);
      }
    });
}

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
}
