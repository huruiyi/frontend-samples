import {Component, OnInit} from '@angular/core';
// @ts-ignore
import getISOWeek from 'date-fns/get_iso_week';
import {en_US, zh_CN, NzI18nService} from 'ng-zorro-antd';
import {debug} from 'util';

@Component({
  selector: 'app-nz-date-picker',
  templateUrl: './nz-date-picker.component.html',
  styleUrls: ['./nz-date-picker.component.css']
})
export class NzDatePickerComponent implements OnInit {

  date = null; // new Date();
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
  isEnglish = false;

  ngOnInit(): void {
  }

  constructor(private i18n: NzI18nService) {
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
}
