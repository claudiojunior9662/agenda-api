import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contato } from './contato/contato';
import { PaginaContato } from './contato/paginaContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  url: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  save(contato: Contato): Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

  list(page: number, size: number): Observable<PaginaContato> {
    return this.http.get<PaginaContato>(this.url, { params: { page: page.toString(), size: size.toString() } });
  }

  favorite(contatoId: number): Observable<any> {
    return this.http.patch(`${this.url}/${contatoId}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData): Observable<any> {
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, {responseType: 'blob'});
  }
}
