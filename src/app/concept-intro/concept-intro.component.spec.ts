import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptIntroComponent } from './concept-intro.component';

describe('ConceptIntroComponent', () => {
  let component: ConceptIntroComponent;
  let fixture: ComponentFixture<ConceptIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
