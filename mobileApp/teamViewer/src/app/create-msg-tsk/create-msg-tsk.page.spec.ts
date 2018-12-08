import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMsgTskPage } from './create-msg-tsk.page';

describe('CreateMsgTskPage', () => {
  let component: CreateMsgTskPage;
  let fixture: ComponentFixture<CreateMsgTskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMsgTskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMsgTskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
