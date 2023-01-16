import { AuthActions } from './auth.actions';
import { Action, createReducer, on } from '@ngrx/store';
export const authFeatureName = 'auth';

interface AuthPayload {
  email: string;
  role: string;
  isAuth: boolean;
}

const initialState: AuthPayload = {
  email: '',
  role: '',
  isAuth: false,
};

export const authReducerInternal = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    email: state.email,
    role: state.role,
    isAuth: true,
  }))
);
