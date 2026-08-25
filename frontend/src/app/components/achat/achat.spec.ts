import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Achat } from './achat';

describe('Achat', () => {
  let component: Achat;
  let fixture: ComponentFixture<Achat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Achat],
    }).compileComponents();

    fixture = TestBed.createComponent(Achat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
