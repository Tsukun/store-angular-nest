import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseItemComponent } from './showcase-item.component';

describe('ShowcaseItemComponent', () => {
  let component: ShowcaseItemComponent;
  let fixture: ComponentFixture<ShowcaseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
