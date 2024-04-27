import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  theme: string = 'light';
  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.theme = localStorage.getItem('theme') || 'light';  // Load theme from storage or default to 'light'
    this.applyTheme();
    this.updateCheckboxState();
  }
  /** handles what to do on theme toggle change */
  onToggleChange(isChecked:Event): void {
    console.log('Toggle is ' + ((isChecked.target as HTMLInputElement).checked ? 'ON' : 'OFF'));
    this.theme = (isChecked.target as HTMLInputElement).checked ? 'dark' : 'light';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);  // Save theme to storage
  }
  /** sets the theme in the dom - state */
  applyTheme(): void {
    this.renderer.setAttribute(this.document.documentElement, 'data-theme', this.theme);
    console.log(`Theme switched to: ${this.theme}`);
  }
  /** sets the UI visual of the checkbox - state */
  updateCheckboxState(): void {
    const checkbox = this.document.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = this.theme === 'dark';
    }
  }
}
