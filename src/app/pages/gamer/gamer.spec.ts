import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gamer } from './gamer';

describe('Gamer', () => {
  let component: Gamer;
  let fixture: ComponentFixture<Gamer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gamer],
    }).compileComponents();

    fixture = TestBed.createComponent(Gamer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
