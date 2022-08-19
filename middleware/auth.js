// Block access to private routes if user is not authenticated
import { getCookie } from 'cookies-next';

import authService from '@/services/auth.service';

/* Sample using middleware */
/* middleware.use(database).use(session).use(passport.initialize()).use(passport.session()); */

/* Set restricted public access / put any api access that is restricted in here */
const restricted = ['/api/order', '/api/product'];

export default async function (req, res, next) {
  const accessToken = getCookie('access_token', { req, res });

  if (!restricted.includes(req.url)) {
    console.log(req.url, 'is a public route');
    return next();
  }
  console.log(req.url, 'is a restricted route');
  if (!accessToken) {
    res.statusCode = 401;
    return res.send({
      status: 'error',
      error: 'Unauthorized',
    });
  }
  return authService().verify(accessToken, (error, user) => {
    if (error) {
      res.statusCode = 401;
      return res.send({
        status: 'error',
        error,
      });
    } else {
      req.user = user;
      return next();
    }
  });
}
