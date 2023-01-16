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

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginUser, (state, { email, role }) => ({
    ...state,
    email: email,
    role: role,
    isAuth: true,
  }))
);
