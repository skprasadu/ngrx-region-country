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
    this.http.get("assets/data.json").subscribe(data =>{
      this.countries = data;
      console.log(this.countries);
      this.regions = [...new Set(this.countries.map((x: { region: string; }) => x.region))];
      console.log(this.regions);
      this.getData(this.regions[0]);

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

  getData(selectedRegion: any) {
    let selectedCountriesBasedOnRegion = this.countries
                      .filter((x: { region: string; }) => x.region == selectedRegion)
                      .map((x: { name: any; }) => x.name);
    this.store.dispatch(selectValueRegion({selectedRegion, selectedCountriesBasedOnRegion}));
                      console.log(selectedRegion, selectedCountriesBasedOnRegion);
    this.getSelectedCountry(selectedCountriesBasedOnRegion[0]);
  }

  getSelectedCountry(selectedCountry: any) {
    let selectedCountryObj = this.countries
                      .filter((x: { name: string; }) => x.name == selectedCountry)[0];

    this.store.dispatch(selectValueCountry({selectedCountry, selectedCountryObj}));
    console.log(selectedCountry, selectedCountryObj);
  }
}
