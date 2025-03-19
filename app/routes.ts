import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index/index.tsx'),
  route('/register', 'routes/register/register.tsx'),
  route('/home', 'routes/home/home.tsx'),
  route('/login', 'routes/login/login.tsx'),
] satisfies RouteConfig;
