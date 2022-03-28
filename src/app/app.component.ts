import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectValueCountry, selectValueRegion } from './counter.actions';
import { Store } from '@ngrx/store';
import { RequestState } from './counter.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Region Country Angular UI';
  
  countries: any = [];
  regions: any[] = [];

  selectValCountry$!: Observable<string>;
  selectValRegion$!: Observable<string>;
  selectedCountryName$!: Observable<string>;
  selectedCountryCapital$!: Observable<string>;
  selectedCountryPopulation$!: Observable<string>;
  selectedCountryCurrencies$!: Observable<string>;
  selectedCountryFlag$!: Observable<string>;
  selectedCountriesBasedOnRegion$!: Observable<any>

  constructor(public http: HttpClient, private store: Store<{ selectVal: RequestState }>) {
  }

  ngOnInit() {
    //For quick and dirty solution, I am loading it ngOnInit in real life example, we have do as 
    //below using NgRX Action/ Effect, as example here,
    //https://stackblitz.com/edit/angular-wglqco?file=src%2Fapp%2Fproduct.effect.ts
    this.http.get("assets/data.json").subscribe(data =>{
      //load countries data
      this.countries = data;
      
      //load regions data
      this.regions = [...new Set(this.countries.map((x: { region: string; }) => x.region))];
      
      //on load select 1st region
      this.getSelectedRegion(this.regions[0]);

      //load all default observables from NgRX
      this.selectValCountry$ = this.store.select(state => state.selectVal.selectedCountry);
      this.selectValRegion$ = this.store.select(state => state.selectVal.selectedRegion);
      this.selectedCountryName$ = this.store.select(state => state.selectVal.selectedCountryObj.name);
      this.selectedCountryCapital$ = this.store.select(state => state.selectVal.selectedCountryObj.capital);
      this.selectedCountryPopulation$ = this.store.select(state => state.selectVal.selectedCountryObj.population);
      this.selectedCountryCurrencies$ = this.store.select(state => state.selectVal.selectedCountryObj.currencies);
      this.selectedCountryFlag$ = this.store.select(state => state.selectVal.selectedCountryObj.flag);
      this.selectedCountriesBasedOnRegion$ = this.store.select(state => state.selectVal.selectedCountriesBasedOnRegion);
    });
  }

  getSelectedRegion(selectedRegion: any) {
    const selectedCountriesBasedOnRegion = this.countries
                      .filter((x: { region: string; }) => x.region == selectedRegion)
                      .map((x: { name: any; }) => x.name);

    //Dispatch selected regions and all the countries based on select regions to ngrx
    this.store.dispatch(selectValueRegion({selectedRegion, selectedCountriesBasedOnRegion}));
                      console.log(selectedRegion, selectedCountriesBasedOnRegion);
    
    this.getSelectedCountry(selectedCountriesBasedOnRegion[0]);
  }

  getSelectedCountry(selectedCountry: any) {
    let selectedCountryObj = this.countries
                      .filter((x: { name: string; }) => x.name == selectedCountry)[0];

    //Dispatch selected countries and the country based on select country to ngrx
    this.store.dispatch(selectValueCountry({selectedCountry, selectedCountryObj}));
  }
}
