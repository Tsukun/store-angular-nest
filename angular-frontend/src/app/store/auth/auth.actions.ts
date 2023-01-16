import { createAction, createActionGroup, props } from '@ngrx/store';

interface IUser {
  email: string;
  role: string;
  isAuth: boolean;
}

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    'Login User': props<IUser>(),
  },
});
