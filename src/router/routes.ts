import TestPage from '../pages';
import AnimationPage from '../pages/animation';
import TestReservePage from '../pages/reserve';

export const routes = [
  {
    path: '/',
    element: TestPage,
  },
  {
    path: '/reserve',
    element: TestReservePage,
  },
  {
    path: '/animations',
    element: AnimationPage,
  },
];
