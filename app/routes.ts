import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index/index.tsx'),
  route('/register', 'routes/register/register.tsx'),
  route('/home', 'routes/home/home.tsx'),
  route('/login', 'routes/login/login.tsx'),

  //admin
  route('/admin', 'routes/admin/homeSection.tsx'),
  route('/admin/user', 'routes/admin/userSection.tsx'),
  route('/admin/like-book', 'routes/admin/likeBookSection.tsx'),
] satisfies RouteConfig;
