import { createAction, createActionGroup, props } from '@ngrx/store';

interface IUser {
  email: string;
  role: string;
  isAuth: boolean;
}

export const AuthActions = createActionGroup({
  source: 'Auth api',
  events: {
    'Login User': props<IUser>(),
  },
});
