import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrphanagecatalogComponent } from './orphanagecatalog.component';

describe('OrphanagecatalogComponent', () => {
  let component: OrphanagecatalogComponent;
  let fixture: ComponentFixture<OrphanagecatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrphanagecatalogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrphanagecatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
