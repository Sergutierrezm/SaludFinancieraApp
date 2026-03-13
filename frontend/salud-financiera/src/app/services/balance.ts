import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Balance {

  private apiUrl = 'http://localhost:8080/balance';

  constructor(private http: HttpClient) {}

  getBalance(year: number, month: number){
    return this.http.get(`${this.apiUrl}?year=${year}&month=${month}`);
  }

}