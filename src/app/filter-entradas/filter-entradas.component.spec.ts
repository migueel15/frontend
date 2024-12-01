import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterEntradasComponent } from './filter-entradas.component';

describe('FilterEntradasComponent', () => {
  let component: FilterEntradasComponent;
  let fixture: ComponentFixture<FilterEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterEntradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
