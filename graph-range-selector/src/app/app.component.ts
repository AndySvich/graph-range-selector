import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'graph-range-selector';

  public today : Date = new Date();

  //Graph Filter related
  public graphMinimumDate : Date = new Date(this.today.getFullYear() - 1, this.today.getMonth(), this.today.getDate());
  public graphMaximumDate : Date = new Date();
  public graphStartDate : Date = this.graphMinimumDate;
  public graphEndDate : Date = new Date();

  graphStartDateUpdated(startDate : FormControl)
  {
    this.graphStartDate = startDate.value;
    console.log("Selected Start Date : " + this.graphStartDate);
  }

  graphEndDateUpdated(endDate : FormControl)
  {
    this.graphEndDate = endDate.value;
    console.log("Selected End Date   : " + this.graphEndDate);
  }

}
