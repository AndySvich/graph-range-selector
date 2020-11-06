import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'graph-range-selector',
  templateUrl: './graph-range-selector.component.html',
  styleUrls: ['./graph-range-selector.component.css']
})
export class GraphRangeSelectorComponent implements OnInit {

  @Output() startDate = new EventEmitter<Date>();
  @Output() endDate = new EventEmitter<Date>();
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() defaultZoomLevel: number = 4;
  @Input() showZoomLevels: boolean = true;

  public fromDateSelected : any;
  public toDateSelected : any;
  public selectedZoomButtonId : number;

  constructor() { }

  ngOnInit(): void {
    this.fromDateSelected = new FormControl(this.minDate);
    this.toDateSelected = new FormControl(this.maxDate);
    this.selectedZoomButtonId = this.defaultZoomLevel;

    this.ZoomButtonClicked(this.selectedZoomButtonId);
  }

  ZoomButtonClicked(selectedButtonId : number)
  {
    this.selectedZoomButtonId = selectedButtonId;
    switch(selectedButtonId)
    {
      case 1:
        {
          this.setFromDateSelected(new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() - 1, this.maxDate.getDate()));
          break;
        }
      case 2:
        {
          this.setFromDateSelected(new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() - 3, this.maxDate.getDate()));
          break;
        }
      case 3:
        {
          this.setFromDateSelected(new Date(this.maxDate.getFullYear(), this.maxDate.getMonth() - 6, this.maxDate.getDate()));
          break;
        }
      case 4:
        {
          this.setFromDateSelected(new Date(this.maxDate.getFullYear() - 1, this.maxDate.getMonth(), this.maxDate.getDate()));
          break;
        }    
      case 5:
        {
          this.setFromDateSelected(new Date(this.maxDate.getFullYear(), 0, 1));
          break;
        }
      case 6:
        {
          this.setFromDateSelected(this.minDate);
          this.setToDateSelected(this.maxDate);
          break;
        }
      default:
        {
          break;
        }
    }
  }

  dateChanged()
  {
    if(this.fromDateSelected.value == null) this.fromDateSelected = new FormControl(this.minDate);
    if(this.toDateSelected.value == null) this.toDateSelected = new FormControl(this.maxDate);

    this.validateSelectedDates();
    this.emitSelectedDates();
    this.adjustZoomLevel();
  }

  emitSelectedDates()
  {
    this.startDate.emit(this.fromDateSelected);
    this.endDate.emit(this.toDateSelected);
  }

  setFromDateSelected(date : Date)
  {
    this.fromDateSelected = new FormControl(date);
    this.startDate.emit(this.fromDateSelected);
  }

  setToDateSelected(date : Date)
  {
    this.toDateSelected = new FormControl(date);
    this.endDate.emit(this.toDateSelected);
  }

  validateSelectedDates()
  {
    if(new Date(this.fromDateSelected.value).getTime() < this.minDate.getTime() || new Date(this.fromDateSelected.value) > new Date(this.toDateSelected.value))
    {
      this.setFromDateSelected(this.minDate);
    }
    if(new Date(this.toDateSelected.value).getTime() > this.maxDate.getTime() || new Date(this.toDateSelected.value) < new Date(this.fromDateSelected.value))
    {
      this.setToDateSelected(this.maxDate);
    }
  }

  adjustZoomLevel()
  {
    this.selectedZoomButtonId = -1;

    var toDateSelected = new Date(this.toDateSelected.value);

    var monthCountArray : number[] = [1,3,6,12];

    for(var i = 0 ; i < monthCountArray.length ; i++)
    {
      var back_traced_from_date = new Date(toDateSelected.getFullYear(), toDateSelected.getMonth() - monthCountArray[i], toDateSelected.getDate());
      if(back_traced_from_date.getTime() == new Date(this.fromDateSelected.value).getTime())
      {
        this.selectedZoomButtonId = i + 1;
      }
    }
    
    if(new Date(this.fromDateSelected.value).getTime() == new Date(this.maxDate.getFullYear(), 0, 1).getTime() 
            && new Date(this.toDateSelected.value).getTime() == this.maxDate.getTime())
    {
      this.selectedZoomButtonId = 5;
    }
    else if(new Date(this.fromDateSelected.value).getTime() == this.minDate.getTime() && new Date(this.toDateSelected.value).getTime() == this.maxDate.getTime())
    {
      this.selectedZoomButtonId = 6;
    }
  }

}
