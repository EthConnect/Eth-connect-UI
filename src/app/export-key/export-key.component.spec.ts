import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportKeyComponent } from './export-key.component';

describe('ExportKeyComponent', () => {
  let component: ExportKeyComponent;
  let fixture: ComponentFixture<ExportKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
