import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Livro } from './livro.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: string = environment.baseUrl
 
  constructor(private http: HttpClient,
              private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: string): Observable<Livro[]>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<Livro[]>(url)
  }

 findById(id: string): Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<Livro>(url)
 }

 update(livro: Livro): Observable<Livro>{
  const url = `${this.baseUrl}/livros/${livro.id}`
  return this.http.put<Livro>(url,livro)
 }

  create(livro: Livro, id_cat: string): Observable<Livro>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<Livro>(url, livro)
  }

  mensagem(str : string): void {
    this._snack.open(`${str}`, 'OK',{
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  delete(id: string): Observable<void>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.delete<void>(url)
  }
}
