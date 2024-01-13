import { useState } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2";

function App() {
  const [searchInput, setSearchInput] = useState("Pikachu");
  const [pokemon, setPokemon] = useState(null);

  function handleChange(e) {
    // searchInput = e.target.value;
    const newSearchInput = e.target.value;
    setSearchInput(newSearchInput);
  }

  async function searchPokemon() {
    try {
      const response = await fetch(
        `${API_URL}/pokemon/${searchInput.toLowerCase()}`
      );

      if (response.ok) {
        const result = await response.json();
        setPokemon(result);
      }
    } catch (error) {
      console.log("[Error]:", error);
    }
  }

  function getStatClass(value) {
    if (value < 40) {
      return "is-danger";
    } else if (value >= 40 && value < 65) {
      return "is-warning";
    } else {
      return "is-success";
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
                <div className="content tags">
                  {pokemon.types.map((item) => {
                    return (
                      <span
                        key={item.type.name}
                        className="tag is-medium is-info"
                      >
                        {item.type.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* riga 105 ho usato il template literals chiamato la funzione getstatClass()*/}

            <div className="content">
              {pokemon.stats.map((item) => {
                return (
                  <p key={item.stat.name}>
                    <span>
                      {item.stat.name} - {item.base_stat}
                    </span>
                    <progress
                      className={`progress is-small ${getStatClass(
                        item.base_stat
                      )}`}
                      value={item.base_stat}
                      max="100"
                    ></progress>
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      );
    } else {
      return <h2>Inserisci il nome di un pokemon...</h2>;
    }
  }

  return (
    <>
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
          <button className="button is-info" onClick={searchPokemon}>
            Cerca Pokemon
          </button>
        </div>
      </div>

      {getPokemonLayout()}
    </>
  );
}

export default App;
