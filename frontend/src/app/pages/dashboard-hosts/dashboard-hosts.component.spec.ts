import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHostsComponent } from './dashboard-hosts.component';

describe('DashboardHostsComponent', () => {
  let component: DashboardHostsComponent;
  let fixture: ComponentFixture<DashboardHostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
