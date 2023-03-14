import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from './perfil';
import { Tratamiento } from './tratamiento';
import { Entrada } from './entrada';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class NsService {


  private url:string="https://ayecorans.herokuapp.com/api/v1/";

  constructor(private httpClient:HttpClient) { }

  //obtener Entradas
  getNumberEntry(num: number):Observable<Entrada[]>{
    return this.httpClient.get<Entrada[]>(this.url+'entries?count='+num);
  }

  //obtener perfil
  getData():Observable<Perfil[]>{
    return this.httpClient.get<Perfil[]>(this.url+'profile');
  }

  //enviar tratamiento
  postTreatments(tratamiento:Tratamiento):Observable<Tratamiento>{
    return this.httpClient.post<Tratamiento>(this.url+'treatments?token=api-b9c5ef15d5586bdc', tratamiento);
  }
 //obtener el tratamiento
  getTreatments():Observable<Tratamiento[]>{
    return this.httpClient.get<Tratamiento[]>(this.url+'treatments??count=1&token=api-b9c5ef15d5586bdc');
  }

}
