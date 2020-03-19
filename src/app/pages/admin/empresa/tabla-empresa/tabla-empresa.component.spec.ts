import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaEmpresaComponent } from './tabla-empresa.component';

describe('TablaEmpresaComponent', () => {
  let component: TablaEmpresaComponent;
  let fixture: ComponentFixture<TablaEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
