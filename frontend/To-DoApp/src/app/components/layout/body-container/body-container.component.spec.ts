import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContainerComponent } from './body-container.component';

describe('BodyContainerComponent', () => {
  let component: BodyContainerComponent;
  let fixture: ComponentFixture<BodyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodyContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BodyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
