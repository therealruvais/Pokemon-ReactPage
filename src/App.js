import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      searchQuery: "",
    };
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemons: data.results });
      })
      .catch((error) => console.log("Error fetching data:", error));
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { pokemons, searchQuery } = this.state;
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.includes(searchQuery.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Pokémon Search</h1>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={this.handleSearchChange}
        />
        <div className="pokemon-list">
          {filteredPokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${
                  index + 1
                }.png`}
                alt={`Pokemon ${pokemon.name}`}
              />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
