import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageDto } from './imageDto';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  upload_image(image:FormData) {
    const formData = new FormData() ; 
    //formData.append('image', image);
    console.log("image",image);
    return this.http.post('http://localhost:9999/image/uploadimage', image);
  }
  
}
