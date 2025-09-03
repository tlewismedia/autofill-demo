import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Suggestion } from '../suggestion/suggestion';

@Component({
  selector: 'app-control',
  imports: [CommonModule, FormsModule, Suggestion],
  templateUrl: './control.html',
  styleUrl: './control.scss',
  standalone: true,
})
export class Control {
  @Input() field: any = null;
  @Input() showSuggestions: boolean = false;
  @Input() suggestionApplied: boolean = false;
  @Input() suggestion: any | null = null;
  @Output() showSuggestionsChange = new EventEmitter<any>();
  @Output() suggestionClick = new EventEmitter<any>();

  inputClick() {
    this.showSuggestionsChange.emit();
  }

  onSuggestionClick(event: string) {
    console.log('onSuggestionClick', event);
    const payload = { fieldId: this.field.id, value: event };
    this.suggestionClick.emit(payload);
  }
}
