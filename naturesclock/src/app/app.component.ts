import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { VegetableInfoBoxComponent } from './vegetable-info-box/vegetable-info-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TimelineComponent, VegetableInfoBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'naturesclock';
}
