import { getCookie } from 'cookies-next';
import authService from '@/services/auth.service';

export function userFromRequest(req) {
  const accessToken = getCookie('access_token', { req });
  if (!accessToken) return null;
  return new Promise((resolve, reject) => {
    authService().verify(accessToken, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}
