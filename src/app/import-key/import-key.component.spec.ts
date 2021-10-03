import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportKeyComponent } from './import-key.component';

describe('ImportKeyComponent', () => {
  let component: ImportKeyComponent;
  let fixture: ComponentFixture<ImportKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
