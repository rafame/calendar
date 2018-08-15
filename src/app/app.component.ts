import { Component } from '@angular/core';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public myDatePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    inline: true,
    showWeekNumbers: true,
    showClearDateRangeBtn: false
  };

  public model: any = { date: { year: 2018, month: 10, day: 9 } };


  // NgBoostrap
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = true;
  outsideDays = 'collapsed';

  // NoBootstrpa prueba
  hoveredDate: NgbDate;
  fromDate: NgbDate[] = [];
  toDate: NgbDate[] = [];

  constructor(calendar: NgbCalendar) {
    this.fromDate[0] = calendar.getToday();
    this.toDate[0] = calendar.getNext(calendar.getToday(), 'd', 2);
    this.fromDate[1] = calendar.getNext(calendar.getToday(), 'd', 13);
    this.toDate[1] = calendar.getNext(calendar.getToday(), 'd', 16);
    this.toDate[2] = calendar.getNext(calendar.getToday(), 'd', 22);
    this.fromDate[2] = calendar.getNext(calendar.getToday(), 'd', 22);
    console.log(this.fromDate[1], this.toDate[1]);
  }

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log(event);
  }
  onDateSelection(date: NgbDate) {
    console.log(date);
    // if (!this.fromDate && !this.toDate) {
    //   this.fromDate = date;
    // } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
    //   this.toDate = date;
    // } else {
    //   this.toDate = null;
    //   this.fromDate = date;

  }

  isHovered = (date: NgbDate) =>
    this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate[0]) && date.before(this.hoveredDate)
  isInside(date: NgbDate) {
    let inside = false;
    // Un bucle iterando sobre esto
    for (let i = 0; i < this.fromDate.length; i++) {
      if (inside = date.after(this.fromDate[i]) && date.before(this.toDate[i])) {
        return inside;
      }
    }
    return inside;
  }

  isRange(date: NgbDate) {
    let range = false;
    // Un bucle iterando sobre esto
    for (let i = 0; i < this.fromDate.length; i++) {
      if (range = date.equals(this.fromDate[i]) || date.equals(this.toDate[i]) || this.isInside(date) || this.isHovered(date)) {
        return range;
      }
    }
    return range;
  }

}
