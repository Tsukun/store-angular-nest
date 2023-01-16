import { createAction, createActionGroup, props } from '@ngrx/store';

interface IUser {
  email: string;
  role: string;
  isAuth: boolean;
  id: string;
}

export const AuthActions = createActionGroup({
  source: 'Authentication',
  events: {
    login: props<IUser>(),
  },
});
