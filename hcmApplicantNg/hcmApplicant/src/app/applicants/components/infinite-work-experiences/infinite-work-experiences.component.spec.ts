import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteWorkExperiencesComponent } from './infinite-work-experiences.component';

describe('InfiniteWorkExperiencesComponent', () => {
  let component: InfiniteWorkExperiencesComponent;
  let fixture: ComponentFixture<InfiniteWorkExperiencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteWorkExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteWorkExperiencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
