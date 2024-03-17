import { Injectable } from '@angular/core';
import { apiServer } from '../api/apiServer';
import { HttpClient } from '@angular/common/http';
import { Library } from '../interfaces/books.interfaces';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl: string = apiServer.serverUrl;

  constructor(private http: HttpClient) {}

  getProduct(): Observable<Library> {
    return this.http.get<Library>(this.apiUrl);
  }
}
