import { Component, Input, OnInit } from '@angular/core';
import { fetchVegetablesAndHerbs } from '../services/apiService'; // Adjust the import path as necessary

interface WeekInfo {
  weekNumber: number | null;
}

interface Vegetable {
  vegetableID: string;
  Name: string;
  CareTips: string;
}

@Component({
  selector: 'app-vegetable-info-box',
  templateUrl: './vegetable-info-box.component.html',
  styleUrls: ['./vegetable-info-box.component.scss'],
  standalone:true,
})
export class VegetableInfoBoxComponent implements OnInit {
  @Input() weekInfo: WeekInfo | null = null;
  data: Vegetable[] = [];
  isLoading = false;
  
  constructor() { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnChanges(): void {
    this.fetchData();
  }

  async fetchData(): Promise<void> {
    console.log(this.weekInfo);
    if (this.weekInfo && this.weekInfo.weekNumber !== undefined && this.weekInfo.weekNumber !== null) {
      this.isLoading = true;
      try {
        const result = await fetchVegetablesAndHerbs(this.weekInfo.weekNumber, 2024, 'Melbourne', -37, 144);
        console.log('API result:', result);
        if (result.matching_vegetables && Array.isArray(result.matching_vegetables)) {
          const convertedResult = result.matching_vegetables.map(this.convertDynamoDBData);
          this.data = convertedResult;
        } else {
          this.data = [];
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  convertDynamoDBData(dynamoData: any): Vegetable {
    const convertedData: Vegetable = {
      vegetableID: dynamoData.vegetableID?.toString() || '',
      Name: dynamoData.Vegetable || 'Unknown',
      CareTips: `Care tips value: ${dynamoData.TestValue}` || 'No care tips available',
    };
    return convertedData;
  }
}