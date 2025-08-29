import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

const intitialState = {
  fields: {
    firstName: {
      showSuggestions: true,
      suggestion: 'Tom',
      suggestionApplied: false,
      suggestionTransitioned: false,
      value: '',
    },
    lastName: {
      showSuggestions: true,
      suggestion: 'Lewis',
      value: '',
    },
  },
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'autofill';
  state = JSON.parse(JSON.stringify(intitialState));

  suggestionClick(key: string, value: string) {
    // set hide state for suggestions
    this.state.fields[key].showSuggestions = false;

    // set value of field to value and fade in
    this.state.fields[key].value = value;
    this.state.fields[key].suggestionApplied = true;
    setTimeout(() => {
      this.state.fields[key].suggestionTransitioned = true;
    }, 200);
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(intitialState));
  }
}
