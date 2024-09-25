import { Component, Input, OnInit } from '@angular/core';
import { fetchVegetablesAndHerbs } from '../services/apiService'; // Adjust the import path as necessary


interface WeekInfo {
  weekNumber: number | null;
}

interface Vegetable {
  vegetableID: string;
  Name: string;
  CareTips: string;
  Day_Temp_Min: number;
  Day_Temp_Max: number;
  Daylight_Min: number;
  Daylight_Optimal: number;
  Humidity_Max: number;
  Humidity_Min: number;
  Night_Temp_Max: number;
  Night_Temp_Min: number;
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
  climateData: any;

  dropdownOptions = ["Sort By", "Alphabetical", "Day Min Temperature", "Day Max Temperature", "Day Min Temperature", "Night Max Temperature", "Min Humidity", "Max Humidity"]
  selectedOption: string = this.dropdownOptions[0];
  
  constructor() { }

  ngOnInit(): void {
    this.fetchData();

    
  }

  ngOnChanges(): void {
    this.fetchData();
  }

  /** fetch data and  make it json readable */
  async fetchData(): Promise<void> {
    console.log(this.weekInfo);
    if (this.weekInfo?.weekNumber) {
      this.isLoading = true;
      try {
       
        const result = await fetchVegetablesAndHerbs(this.weekInfo.weekNumber, 2024, 'Melbourne', -37, 144);
        
        console.log('API result:', result);
        if (result.matching_vegetables && Array.isArray(result.matching_vegetables)) {
          this.data = result.matching_vegetables.map(this.convertDynamoDBData);
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
/** Converts data to fit the vegetable interface */
  convertDynamoDBData(dynamoData: any): Vegetable {
    const convertedData: Vegetable = {
      vegetableID: dynamoData.vegetableID?.toString() || '',
      Name: dynamoData.Vegetable || 'Unknown',
      CareTips: `Care tips value: ${dynamoData.Care_Tips}` || 'No care tips available',
      Day_Temp_Min: dynamoData.Day_Temp_Min,
      Day_Temp_Max: dynamoData.Day_Temp_Max,
      Daylight_Min: dynamoData.Daylight_Min,
      Daylight_Optimal: dynamoData.Daylight_Optimal,
      Humidity_Max: dynamoData.Humidity_Max,
      Humidity_Min: dynamoData.Humidity_Min,
      Night_Temp_Max: dynamoData.Night_Temp_Max,
      Night_Temp_Min: dynamoData.Night_Temp_Min,
    };
    return convertedData;
  }

  onSortOptionChange(selectedValue: Event): void {
    const selectElement = selectedValue.target as HTMLSelectElement; // Correctly casting the event target
    this.selectedOption = selectElement.value; // Accessing the value property
    console.log("alpha")
    console.log(this.selectedOption.valueOf)
    switch(this.selectedOption) {
      case "Alphabetical":
        this.data.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "Min Day Temperature":
        this.data.sort((a, b) => a.Day_Temp_Min.toString().localeCompare(b.Day_Temp_Min.toString(), undefined, {numeric:true}));
        break;
      case "Max Day Temperature":
        this.data.sort((a, b) => b.Day_Temp_Max.toString().localeCompare(a.Day_Temp_Max.toString(), undefined, {numeric:true}));
        break;
    }
  }

/** Converts data to fit the vegetable interface */
AlphabeticalDynamoDBData(): void {
  console.log("alphebtical")
  this.data.sort((a, b) => a.Name.localeCompare(b.Name));
}

}
