import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthService', () => {
  const initialState = {};

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatSnackBarModule
    ],
    providers: [ provideMockStore({ initialState }) ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });
});
