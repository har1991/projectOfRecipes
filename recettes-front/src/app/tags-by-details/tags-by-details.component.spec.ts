import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsByDetailsComponent } from './tags-by-details.component';

describe('TagsByDetailsComponent', () => {
  let component: TagsByDetailsComponent;
  let fixture: ComponentFixture<TagsByDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsByDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsByDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
