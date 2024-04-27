// src/app/timeline/timeline.component.ts
import { Component, OnInit } from '@angular/core';
import { TimelineDataService, WeekInfo } from '../services/timeline-data';
import { DatePipe } from '@angular/common';
import { VegetableInfoBoxComponent } from '../vegetable-info-box/vegetable-info-box.component';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  standalone:true,
  imports: [DatePipe, VegetableInfoBoxComponent]
})
export class TimelineComponent implements OnInit {
  timelineData:any[] = [];
  selectedWeek: WeekInfo | null = null;
  isLoading = true;

  constructor(private timelineDataService: TimelineDataService) {}
empty:string = " "

async ngOnInit() {
  this.timelineData = await this.timelineDataService.generateTimeline();
  this.isLoading = false; // Set isLoading to false after the data is loaded
}

/** Handles click event on timeline week 
 * @param {WeekInfo} WeekInfo array of strings
*/
handleWeekClick(weekInfo: WeekInfo): void {
    this.selectedWeek = weekInfo;
    console.log(this.selectedWeek,"Selected Week");
  }
}
