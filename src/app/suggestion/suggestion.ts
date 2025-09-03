import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  imports: [CommonModule],
  templateUrl: './suggestion.html',
  styleUrl: './suggestion.scss',
  standalone: true,
})
export class Suggestion {
  @Input() suggestionTransitioned: boolean = false;
  @Input() showSuggestions: boolean = false;
  @Input() suggestion: string = '';
  @Output() suggestionClick = new EventEmitter<string>();

  handleClick(suggestion: string) {
    console.log('handleClick', suggestion);
    this.suggestionClick.emit(suggestion);
  }
}
