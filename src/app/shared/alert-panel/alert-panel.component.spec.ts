import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatExpansionModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AlertPanelComponent } from './alert-panel.component';

describe('AlertPanelComponent', () => {
  let component: AlertPanelComponent;
  let fixture: ComponentFixture<AlertPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatCardModule, MatExpansionModule, NoopAnimationsModule],
      declarations: [AlertPanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPanelComponent);
    component = fixture.componentInstance;
    component.config = { showMessage: false, title: 'Welcome to IDDOC' };
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleAlertMessage', () => {
    it('should flip the value of show message', () => {
      expect(component.config.showMessage).toEqual(false);

      component.toggleAlertMessage();

      expect(component.config.showMessage).toEqual(true);
    });
  });
});
