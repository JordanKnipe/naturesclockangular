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

  ngOnInit(): void {
    this.timelineData = this.timelineDataService.generateTimeline();
    // Simulating async operation
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  handleWeekClick(weekInfo: WeekInfo): void {
    this.selectedWeek = weekInfo;
    console.log(this.selectedWeek,"Selected Week");
  }
}
