import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Intentamos obtener el token/header guardado en el localStorage
  const authHeader = localStorage.getItem('authHeader');

  // 2. Si existe, clonamos la petición y le añadimos la cabecera
  if (authHeader) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: authHeader
      }
    });
    return next(authReq);
  }

  // 3. Si no hay nada guardado (ej. no ha hecho login), enviamos la petición original
  return next(req);
};
