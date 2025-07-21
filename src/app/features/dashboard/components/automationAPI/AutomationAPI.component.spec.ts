import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationAPIComponent } from './AutomationAPI.component';

describe('AutomationAPIComponent', () => {
  let component: AutomationAPIComponent;
  let fixture: ComponentFixture<AutomationAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationAPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomationAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
