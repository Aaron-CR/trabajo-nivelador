import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaNoticiaComponent } from './tabla-noticia.component';

describe('TablaNoticiaComponent', () => {
  let component: TablaNoticiaComponent;
  let fixture: ComponentFixture<TablaNoticiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaNoticiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
