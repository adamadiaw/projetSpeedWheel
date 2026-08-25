import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exported } from './exported';

describe('Exported', () => {
  let component: Exported;
  let fixture: ComponentFixture<Exported>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Exported],
    }).compileComponents();

    fixture = TestBed.createComponent(Exported);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
