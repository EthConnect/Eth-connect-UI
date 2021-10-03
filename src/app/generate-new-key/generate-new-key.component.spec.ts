import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNewKeyComponent } from './generate-new-key.component';

describe('GenerateNewKeyComponent', () => {
  let component: GenerateNewKeyComponent;
  let fixture: ComponentFixture<GenerateNewKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateNewKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateNewKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
