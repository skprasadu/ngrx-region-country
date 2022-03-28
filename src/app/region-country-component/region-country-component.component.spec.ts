import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCountryComponentComponent } from './region-country-component.component';

describe('RegionCountryComponentComponent', () => {
  let component: RegionCountryComponentComponent;
  let fixture: ComponentFixture<RegionCountryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionCountryComponentComponent ]
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
});
