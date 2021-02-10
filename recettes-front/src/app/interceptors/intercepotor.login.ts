import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

export class LoginInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("inerceptor");
        const token = localStorage.getItem('token');
        //console.log("notre:",token);
        if (token){
        const cloneReq = req.clone({
            //params : new HttpParams().set('token',token) 
            setHeaders: { 
                'Authorization': `Bearer ${token}`
            } 
        });
        return next.handle(cloneReq);
    }
        else{
            return next.handle(req)
        }
        
    }

}
export const LoginInterCeptorProvider ={
    provide : HTTP_INTERCEPTORS ,
    useClass :LoginInterceptor ,
    multi : true 

}