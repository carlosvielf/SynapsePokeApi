import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

  constructor(private http: HttpClient) {}

  // Lista de Pokémons com nome e URL
  getPokemon(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Detalhes de um Pokémon a partir da URL
  getPokemonDetalhes(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}
