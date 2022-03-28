import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCountryComponentComponent } from './region-country-component.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { selectValReducer } from '../ngrx/app.reducer';

describe('RegionCountryComponentComponent', () => {
  let component: RegionCountryComponentComponent;
  let fixture: ComponentFixture<RegionCountryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionCountryComponentComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({ selectVal: selectValReducer }),
      ],
      providers: [HttpClientModule, StoreModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCountryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Region Country Angular UI'`, () => {
    const fixture = TestBed.createComponent(RegionCountryComponentComponent);
    const app = fixture.componentInstance;
    expect(component.title).toEqual('Region Country Angular UI');
  });

});
