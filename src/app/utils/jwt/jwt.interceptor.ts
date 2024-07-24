import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorage } from './token.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenStorage = new TokenStorage();
  const token = tokenStorage.getAccessToken()?.trim();
  if (!(token === undefined || token === '' || token === null)) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });
    return next(authRequest);
  }
  return next(req);
};
