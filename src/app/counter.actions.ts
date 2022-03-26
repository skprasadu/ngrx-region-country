import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');
export const selectValueCountry = createAction('[Counter Component] SelectValCountry',
    props<{selectedCountry: string, selectedCountryObj: any}>());

export const selectValueRegion = createAction('[Counter Component] SelectValRegion',
    props<{selectedRegion: string, selectedCountriesBasedOnRegion: any}>());