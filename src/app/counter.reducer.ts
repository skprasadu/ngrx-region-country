import { createReducer, on } from '@ngrx/store';
import { selectValueCountry, selectValueRegion } from './counter.actions';

export class RequestState {
  selectedCountry!: string;
  selectedRegion!: string;
  selectedCountryObj: any;
  selectedCountriesBasedOnRegion: any;
}

export const requestInitialState: RequestState = {
  selectedCountry: '',
  selectedRegion: '',
  selectedCountryObj: {},
  selectedCountriesBasedOnRegion: []
}

export const selectValReducer = createReducer(
  requestInitialState,
  on(selectValueRegion, (state, { selectedRegion, selectedCountriesBasedOnRegion }) => 
              ({...state, selectedRegion, selectedCountriesBasedOnRegion })),
  on(selectValueCountry, (state, { selectedCountry, selectedCountryObj }) => 
              ({...state, selectedCountry, selectedCountryObj }))
);