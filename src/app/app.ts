import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control } from './control/control';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  imports: [
    CommonModule,
    FormsModule,
    Control,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  protected title = 'autofill';
  state = JSON.parse(JSON.stringify(intitialState));
  thesaurus = thesaurus;
  vault = vault;
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.newFormToast();
  }

  newFormToast() {
    this.openSnackBar('There are suggestions from your Vault.', 'OK', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openSnackBar(message: string, action: string, config: any) {
    this._snackBar.open(message, action, config);
  }

  setFieldValueById(fieldId: any, value: any) {}
  suggestionClick(event: any) {
    const id = event.fieldId;
    const value = event.value;

    const foundField = this.state.fields.find(
      (field: { id: any }) => field.id === id
    );

    if (foundField) {
      const idx = this.state.fields.indexOf(foundField);
      this.state.fields[idx].value = value;

      this.state.fields[idx].showSuggestions = false;
      this.state.fields[idx].suggestionApplied = true;
      setTimeout(() => {
        this.state.fields[idx].suggestionTransitioned = true;
      }, 200);
    }
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(intitialState));
  }

  showSuggestionsChange() {
    console.log('showSuggestionsChange');
  }

  getSuggestion(field: any) {
    const foundThesaurusItem = thesaurus.find(
      (thesaurusItem) => thesaurusItem.label === field.label
    );

    if (foundThesaurusItem) {
      const canonical = foundThesaurusItem.canonical;

      const foundSuggestion = vault.find(
        (vaultItem) => vaultItem.canonical === canonical
      );

      const suggestion = foundSuggestion?.value;

      return suggestion;
    }

    return null;
  }

  saveToVault(fields: any) {
    fields.forEach((field: any) => {
      vault.push({
        value: field.value,
        canonical: field.canonical,
      });
    });

    this.openSnackBar(
      'Your Vault has been updated.',
      "Wait, don't save those!",
      {
        duration: 4000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }

  onSubmit() {
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

  onNewForm() {
    const mockValue = this.state.fields[2].value;
    this.reset();
    this.mockStateUpdate(mockValue);
    this.newFormToast();
  }
}
