import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const memoizedUserSelector = createSelector(
  [selectUser],
  (user) => user
);
