import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecipeOrUpdateComponent } from './create-recipe-or-update.component';

describe('CreateRecipeOrUpdateComponent', () => {
  let component: CreateRecipeOrUpdateComponent;
  let fixture: ComponentFixture<CreateRecipeOrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRecipeOrUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipeOrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
