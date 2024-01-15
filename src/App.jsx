import { useState } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2";

function SearchBar({ searchFn }) {
  const [searchInput, setSearchInput] = useState("Pikachu");

  function handleChange(e) {
    // searchInput = e.target.value;
    const newSearchInput = e.target.value;
    setSearchInput(newSearchInput);
  }
  return (
    <div className="field has-addons">
      <div className="control is-expanded">
        <input
          type="text"
          className="input"
          value={searchInput}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="control">
        <button
          className="button is-info"
          onClick={() => searchFn(searchInput)}
        >
          Cerca Pokemon
        </button>
      </div>
    </div>
  );
}

function Pokemon({ pokemon }) {
  function getStatClass(value) {
    if (value < 40) {
      return "is-danger";
    } else if (value >= 40 && value < 65) {
      return "is-warning";
    } else {
      return "is-success";
    }
  }

  // Scriviamo due funzioni al posto del map per rendere il codice più leggero

  function getTypes() {
    return pokemon.types.map((item) => {
      return (
        <span key={item.type.name} className="tag is-medium is-info">
          {item.type.name}
        </span>
      );
    });
  }

  function getStats() {
    return pokemon.stats.map((item) => {
      return (
        <p key={item.stat.name}>
          <span>
            {item.stat.name} - {item.base_stat}
          </span>
          <progress
            className={`progress is-small ${getStatClass(item.base_stat)}`}
            value={item.base_stat}
            max="100"
          ></progress>
        </p>
      );
    });
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-128x128">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{pokemon.name}</p>
            <p className="subtitle is-6">@Loremipsum</p>
            <div className="content tags">{getTypes()}</div>
          </div>
        </div>

        {/* riga 105 ho usato il template literals chiamato la funzione getstatClass()*/}

        <div className="content">{getStats()}</div>
      </div>
    </div>
  );
}

function App() {
  const [pokemon, setPokemon] = useState(null);

  async function searchPokemon(pokemon) {
    try {
      const response = await fetch(
        `${API_URL}/pokemon/${pokemon.toLowerCase()}`
      );

      if (response.ok) {
        const result = await response.json();
        setPokemon(result);
      }
    } catch (error) {
      console.log("[Error]:", error);
    }
  }

  {
    /* se pokemon è null mostra il seguente blocco (card) - conditional rendering */
  }

  {
    /* {pokemon !== null && (
    <div className="card">
    <div className="card-content">
    <div className="media">
    <div className="media-left">
    <figure className="image is-128x128">
    <img
    src="https://bulma.io/images/placeholders/96x96.png"
    alt="Placeholder image"
    />
    </figure>
    </div>
    <div className="media-content">
    <p className="title is-4">{pokemon.name}</p>
    <p className="subtitle is-6">@johnsmith</p>
    <div className="content tags">{}</div>
    </div>
    </div>
    
    <div className="content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
    nec iaculis mauris.
    </div>
    </div>
    </div> */
  }

  function getPokemonLayout() {
    if (pokemon !== null) {
      return <Pokemon pokemon={pokemon} />;
    } else {
      return <h2>Inserisci il nome di un pokemon...</h2>;
    }
  }

  return (
    <>
      <SearchBar searchFn={searchPokemon} />

      {getPokemonLayout()}
    </>
  );
}

export default App;
