import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDatetimeFilterComponent } from './group-datetime-filter.component';

describe('GroupDatetimeFilterComponent', () => {
  let component: GroupDatetimeFilterComponent;
  let fixture: ComponentFixture<GroupDatetimeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupDatetimeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDatetimeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
