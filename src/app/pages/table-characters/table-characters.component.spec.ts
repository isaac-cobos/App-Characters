import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { TableCharactersComponent } from './table-characters.component';

describe('TableCharactersComponent', () => {
  let component: TableCharactersComponent;
  let fixture: ComponentFixture<TableCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCharactersComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
