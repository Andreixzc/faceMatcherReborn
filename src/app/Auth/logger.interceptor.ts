import { HttpInterceptorFn } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { EMPTY } from 'rxjs';


export const testInterceptor: HttpInterceptorFn = (req, next) => {
  //clone the req and set manualy the token:
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJGYWNlUmVjIiwic3ViIjoiYmJlMGJhNTAtYTNlOC00ZjUzLWIxMGYtMjA0NTkzNDdjMGY1IiwiZXhwIjoxNzA3OTc1MDk1fQ.Ww5sJl044i5l-lVlQW06XN2ytTFHVpK4lDX5iTvX1vw';
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
}

// export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
//   if (req.headers.get('skipAuthCheck') === 'true') {
//     return next(req);
//   }

//   const token: string | null = localStorage.getItem('jwt');
//   const router: Router = new Router();

//   if (token !== null && validateExpiration(token)) {
//     console.log("TOKEN: " + token);

//     // Clona a requisição e define o cabeçalho de autorização no clone
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     console.log("Authorization Header: " + authReq.headers.get('Authorization'));

   
//     // Continua com o próximo manipulador usando o clone da requisição modificada
//     return next(authReq);
//   }

//   // Redireciona para a página de login se o token estiver ausente ou expirado
//   router.navigate(['/login']);
  
//   // Retorna um Observable vazio para cancelar a requisição
//   return EMPTY;
// };

// const validateExpiration = (token: string) => {
//   return true; // Implemente a lógica de validação de expiração do token aqui
// };
