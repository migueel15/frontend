import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWikiComponent } from './new-wiki.component';

describe('NewWikiComponent', () => {
  let component: NewWikiComponent;
  let fixture: ComponentFixture<NewWikiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWikiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWikiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
