import { createSelector, createFeatureSelector } from '@ngrx/store';

interface AuthPayload {
  email: string;
  role: string;
  isAuth: boolean;
}
const selectUsers = createFeatureSelector<AuthPayload>('auth');

export const selectIUser = createSelector(
  selectUsers,
  (state: AuthPayload) => state
);
