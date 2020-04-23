import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrphanagePage } from './orphanage.page';

describe('OrphanagePage', () => {
  let component: OrphanagePage;
  let fixture: ComponentFixture<OrphanagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphanagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrphanagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
