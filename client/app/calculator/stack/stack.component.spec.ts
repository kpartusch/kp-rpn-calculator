import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDividerModule, MatListModule } from '@angular/material';

import { StackComponent } from './stack.component';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatDividerModule
      ],
      declarations: [ StackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least two entries', () => {
    expect(component.entries).toBeTruthy();
    expect(component.entries.length).toEqual(2);
  });

  it('should have zero result', () => {
    expect(component.result).toBe('0');
  });
});
