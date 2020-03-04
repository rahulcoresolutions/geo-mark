import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakePicturePage } from './take-picture.page';

describe('TakePicturePage', () => {
  let component: TakePicturePage;
  let fixture: ComponentFixture<TakePicturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakePicturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakePicturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
