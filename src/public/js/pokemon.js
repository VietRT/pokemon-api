import { DOMElements } from "/js/dom_modules.js";
import { getSpecies, getAllLocations } from "/js/fetch.js";

export let pokemonObject = {
  specie: "N/A",
  evolutionChain: [],
  evolutionData: [],
  encounterLocation: []
} ;

export const displayPokemon = function (api_url) {  

  clearElements(DOMElements.typeList);
  clearElements(DOMElements.available_data_table);

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
  getAllLocations();
}

export const displayAppearOccurence = function(games_array) {
  
  clearElements(DOMElements.gamesList);

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

export const clearElements = function(element) {
  if(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}
