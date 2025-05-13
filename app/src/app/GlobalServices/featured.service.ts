import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeaturedService {

  constructor(private http:HttpClient) { }

  getFeaturedProducts(){
    return this.http.get('http://localhost:7001/api/featured/getfeatured');
  }
  
  addFeaturedProduct(data:any){
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
    return this.http.post(`http://localhost:7001/api/featured/feature/${data._id}`, {}, { headers });
  }
  removeFeaturedProduct(productId: string) {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('auth_token')}`
  };
  return this.http.delete(`http://localhost:7001/api/featured/remove/${productId}`, { headers });
}
}
