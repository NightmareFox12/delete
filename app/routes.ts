import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/index/index.tsx'),
  route('/register', 'routes/register/register.tsx'),
  route('/login', 'routes/login/login.tsx'),

  //home
  // route('/home', 'routes/home/home.tsx'),
  route('/home/book', 'routes/home/bookPage/BookPage.tsx'),
  route('/home/news', 'routes/home/newsPage/NewsPage.tsx'),

  //admin
  route('/admin', 'routes/admin/homePage/HomePage.tsx'),
  route('/admin/user', 'routes/admin/UserPage/UserPage.tsx'),
  route('/admin/like-book', 'routes/admin/likeBookPage/LikeBookPage.tsx'),
] satisfies RouteConfig;
