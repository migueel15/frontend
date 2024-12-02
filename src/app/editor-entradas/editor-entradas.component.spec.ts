import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorEntradasComponent } from './editor-entradas.component';

describe('EditorEntradasComponent', () => {
  let component: EditorEntradasComponent;
  let fixture: ComponentFixture<EditorEntradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorEntradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorEntradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
