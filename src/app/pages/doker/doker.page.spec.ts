import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DokerPage } from './doker.page';

describe('DokerPage', () => {
  let component: DokerPage;
  let fixture: ComponentFixture<DokerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DokerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
