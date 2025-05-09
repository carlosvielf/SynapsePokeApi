import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HomeComponent implements OnInit {

  listaPokemons: any[] = [];
  pokemonsFiltrados: any[] = [];
  searchTerm: string = '';
  pokemonSelecionado: any | null = null;

  private apiUrlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokeApiService.getPokemon().subscribe(response => {
      this.listaPokemons = response.results.map((pokemon: any, index: number) => ({
        ...pokemon,
        id: index + 1
      }));
      this.pokemonsFiltrados = [...this.listaPokemons];
      console.warn("Lista de Pokémons => ", this.listaPokemons);
    });
  }

  getPokemonImageUrl(id: number): string {
    return `${this.apiUrlImage}/${id}.png`;
  }

  filtrarPokemons(): void {
    const termo = this.searchTerm.toLowerCase();
    this.pokemonsFiltrados = this.listaPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(termo)
    );
  }

  selecionarPokemon(pokemon: any): void {
    this.pokeApiService.getPokemonDetalhes(pokemon.url).subscribe({
      next: (data) => {
        this.pokemonSelecionado = data;
        console.log('Detalhes do Pokémon:', data);
      },
      error: (err) => {
        console.error('Erro ao buscar detalhes do Pokémon:', err);
      }
    });
  }

  fecharDetalhes(): void {
    this.pokemonSelecionado = null;
  }
}
