import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardWindowTemplateComponent } from './DashboardWindow.template.component';

describe('DashboardWindowComponent', () => {
  let component: DashboardWindowTemplateComponent;
  let fixture: ComponentFixture<DashboardWindowTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardWindowTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardWindowTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
