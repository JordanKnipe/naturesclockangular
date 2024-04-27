// src/app/timeline-data.service.ts
import { Injectable } from '@angular/core';
import { startOfWeek, subMonths, getWeek, getYear, isSameWeek, addWeeks } from 'date-fns';

/** data pulled in from http request to display on week box */
export interface WeekInfo {
  start: Date;
  weekNumber: number;
  isEndOfYear: boolean;
  isCurrentWeek: boolean;
}

interface TimelineData {
  [key: string]: { [key: string]: WeekInfo[] };
}

@Injectable({
  providedIn: 'root',
})
export class TimelineDataService {
  constructor() {}
  /** generate the timeline */
  generateTimeline() {
    const timeline = [];
    let weekStart = startOfWeek(subMonths(new Date(), 6));
    
    for (let i = 0; i < 6 * 4 * 2; i++) {
      const yearNumber = getYear(weekStart);
      const monthNumber = weekStart.getMonth();
      let year:any = timeline.find(y => y.year === yearNumber);
      if (!year) {
        year = { year: yearNumber, months: [] };
        timeline.push(year);
      }
      let month = year.months.find((m:any) => m.month === monthNumber);
      if (!month) {
        month = { month: monthNumber, weeks: [] };
        year.months.push(month);
      }
      
      const weekInfo: WeekInfo = {
        start: weekStart,
        weekNumber: getWeek(weekStart),
        isEndOfYear: monthNumber === 11 && weekStart.getDate() > 24,
        isCurrentWeek: isSameWeek(weekStart, new Date()),
      };

      month.weeks.push(weekInfo);
      weekStart = addWeeks(weekStart, 1);
    }
    
    return timeline;
  }
}
