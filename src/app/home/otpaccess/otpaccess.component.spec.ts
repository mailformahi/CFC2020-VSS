import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpaccessComponent } from './otpaccess.component';

describe('OtpaccessComponent', () => {
  let component: OtpaccessComponent;
  let fixture: ComponentFixture<OtpaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpaccessComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
