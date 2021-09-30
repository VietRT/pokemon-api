import { DOMElements } from "/js/dom_modules.js";
import { getSpecies } from "/js/fetch.js";

export let pokemonObject = {
  specie: "N/A",
  evolutionChain: [],
  evolutionData: []
} ;

export const displayPokemon = function (api_url) {  

  clearTypingsList();
  clearEvolutionsList();

  DOMElements.pokePic.src = `${api_url.sprites["front_default"]}`;
  DOMElements.pokePic.id = `display-pokemon-active`;

  api_url.types.forEach((type, index) => {
    const typing = document.createElement("li");
    //console.log(api_url.types[index].type.name);
    typing.innerHTML = api_url.types[index].type.name;
    typing.setAttribute('id', "typing");
    DOMElements.typeList.append(typing);
  });

  getSpecies();
}

export const displayAppearOccurence = function(games_array) {
  
  clearVersionsTable();

  games_array.forEach(game => {
    const listItem = document.createElement("li");
    DOMElements.gamesList.append(listItem);
    const version = document.createElement("a");
    version.setAttribute("href", "");
    version.setAttribute("id", "game-version");
    version.innerHTML = game["version"].name;
    listItem.append(version);
  });
}

export const clearVersionsTable = function() {
  //const table = document.querySelector("#games-ul-list");
  if(DOMElements.gamesList) {
    while(DOMElements.gamesList.firstChild) {
      DOMElements.gamesList.removeChild(DOMElements.gamesList.firstChild);
    }
  }
}

export const clearTypingsList = function() {
  if(DOMElements.typeList) {
    while(DOMElements.typeList.firstChild) {
      DOMElements.typeList.removeChild(DOMElements.typeList.firstChild);
    }
  }
}

export const clearEvolutionsList = function () {
  if(pokemonObject.evolutionChain.length > 0) {
    pokemonObject.evolutionChain = [];
  }

  const data = document.querySelector("#available-data-results");

  if(data) {
    while(data.firstChild) {
      data.removeChild(data.firstChild);
    }
  }
}