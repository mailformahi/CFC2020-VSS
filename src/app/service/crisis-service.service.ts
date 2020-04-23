import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HelperDetails } from '../Model/helper-details';

@Injectable({
  providedIn: 'root'
})
export class CrisisServiceService {

  OTPApiURL = "http://localhost:8001/generateOTP";
  submitApiURL = "http://localhost:8001/submit";
  orphanageApiURL = "http://localhost:8001/getOrphanages"
  constructor(private httpClient: HttpClient) { }

  public generateOtp(phone: string){
    const params = new HttpParams().set('phone', phone);
    return this.httpClient.get(`${this.OTPApiURL}`,{params});
  }

  public submitCrisisData(helperDetail: HelperDetails){
    return this.httpClient.post(`${this.submitApiURL}`,helperDetail);
  }

  public getOrphanages(location: string){
    const params = new HttpParams().set('location', location);
    return this.httpClient.get(`${this.orphanageApiURL}`, {params});
  }
}
