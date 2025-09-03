import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Suggestion } from './suggestion/suggestion';
import { Control } from './control/control';

const intitialState = {
  fields: [
    {
      showSuggestions: true,
      suggestion: 'Tom',
      label: 'First Name',
      canonical: 'first_name',
      suggestionApplied: false,
      suggestionTransitioned: false,
      value: '',
      id: 1,
    },
    {
      showSuggestions: true,
      suggestion: 'Lewis',
      value: '',
      label: 'Last Name',
      canonical: 'last_name',
      id: 2,
    },
    {
      showSuggestions: false,
      suggestion: null,
      value: '',
      label: 'Email',
      canonical: 'email',
      id: 3,
    },
  ],
};

const thesaurus = [
  {
    label: 'First Name',
    canonical: 'first_name',
  },
  {
    label: 'What is your first name?',
    canonical: 'first_name',
  },
  {
    label: 'Last Name',
    canonical: 'last_name',
  },
  {
    label: 'Email',
    canonical: 'email',
  },
];

const vault = [
  {
    value: 'Tom',
    canonical: 'first_name',
  },
  {
    value: 'Lewis',
    canonical: 'last_name',
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, Suggestion, Control],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected title = 'autofill';
  state = JSON.parse(JSON.stringify(intitialState));
  thesaurus = thesaurus;
  vault = vault;

  setFieldValueById(fieldId: any, value: any) {}
  suggestionClick(event: any) {
    console.log('suggestionClick', event);

    const id = event.fieldId;
    const value = event.value;

    const foundField = this.state.fields.find(
      (field: { id: any }) => field.id === id
    );

    if (foundField) {
      const idx = this.state.fields.indexOf(foundField);
      this.state.fields[idx].value = value;

      // set hide state for suggestions
      this.state.fields[idx].showSuggestions = false;

      this.state.fields[idx].suggestionApplied = true;
      setTimeout(() => {
        this.state.fields[idx].suggestionTransitioned = true;
      }, 200);
    }

    // set value of field to value and fade in
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(intitialState));
  }

  showSuggestionsChange() {
    console.log('showSuggestionsChange');
    // set to false for field whoes input was clicked
  }

  getSuggestion(field: any) {
    // console.log('in getSuggestion for field:');
    // console.log(field);

    const foundThesaurusItem = thesaurus.find(
      (thesaurusItem) => thesaurusItem.label === field.label
    );

    if (foundThesaurusItem) {
      // console.log('foundThesaurusItem: ');
      // console.log(foundThesaurusItem);
      const canonical = foundThesaurusItem.canonical;

      const foundSuggestion = vault.find(
        (vaultItem) => vaultItem.canonical === canonical
      );

      const suggestion = foundSuggestion?.value;

      // console.log('returning suggestion');
      // console.log(suggestion);

      return suggestion;
    }

    return null;
  }

  saveToVault(fields: any) {
    console.log('saveToVault');
    console.log(fields);

    fields.forEach((field: any) => {
      vault.push({
        value: field.value,
        canonical: field.canonical,
      });
    });
  }

  onSubmit() {
    console.log('onSubmit');

    //save new fields to vault

    // fields without suggestions
    const fieldsWithoutSuggestions = this.state.fields.filter(
      (field: { suggestion: any }) => !field.suggestion
    );

    this.saveToVault(fieldsWithoutSuggestions);
  }

  mockStateUpdate(mockValue: any) {
    this.state.fields[0].label = 'What is your first name?';
    this.state.fields[2].showSuggestions = true;
    this.state.fields[2].suggestion = mockValue;
  }

  // simulate new state updated with added field value
  onNewForm() {
    console.log('onNewForm');
    const mockValue = this.state.fields[2].value;
    this.reset();
    this.mockStateUpdate(mockValue);
  }
}
