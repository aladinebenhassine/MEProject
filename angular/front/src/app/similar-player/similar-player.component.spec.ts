import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarPlayerComponent } from './similar-player.component';

describe('SimilarPlayerComponent', () => {
  let component: SimilarPlayerComponent;
  let fixture: ComponentFixture<SimilarPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimilarPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
