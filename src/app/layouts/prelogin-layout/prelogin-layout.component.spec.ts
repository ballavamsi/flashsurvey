import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PreLoginLayoutComponent } from './prelogin-layout.component';

describe('PreLoginLayoutComponent', () => {
  let component: PreLoginLayoutComponent;
  let fixture: ComponentFixture<PreLoginLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoginLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
