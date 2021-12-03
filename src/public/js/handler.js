"use strict"

import {DOMElements} from "/js/dom_modules.js";
import {getPokemon} from "/js/fetch.js";
import {pokemonObject, clearElements} from "/js/pokemon.js"

DOMElements.evolution_data.addEventListener("click", (event) =>{
  if(DOMElements.available_data_table.firstChild) {
    //pokemonObject.evolutionChain = [];
    clearElements(DOMElements.available_data_table);
    }
  event.preventDefault();
  pokemonObject.evolutionChain.forEach((species) => {
    const data = document.querySelector("#available-data-results");
    const specie = document.createElement("a");
    specie.setAttribute("href", "");
    specie.innerHTML = species.species_name + "<br>";
    specie.setAttribute("id", `evolution-specie`);
    specie.setAttribute("class", `${species.species_name}`);
    data.append(specie);
  });
  console.log(pokemonObject.evolutionChain);
});

DOMElements.encounterLocation.addEventListener("click", (event) => {
  if(DOMElements.available_data_table.firstChild) {
    //pokemonObject.encounterLocation = [];
    clearElements(DOMElements.available_data_table);
  }
  event.preventDefault();  
  pokemonObject.encounterLocation.forEach(locations => {
    const data = document.querySelector("#available-data-results");
    const location = document.createElement("a");
    location.innerHTML = locations.location_area["name"] + "<br>";
    location.setAttribute("id", "encounter-location");
    data.append(location);
  });

  // document.querySelector("#table-of-contents").style.height = DOMElements.available_data_table;
})

document.addEventListener("click", (event) => {
  switch (event.target && event.target.id) {
    case "game-version":
      event.preventDefault();
      document.querySelector("#display-pokemon-info").style.display = "table";
      break;
    case "evolution-specie":
      event.preventDefault();
      DOMElements.pokeSearch.value = event.target.className;
      getPokemon()
  }

});

DOMElements.searchBtn.addEventListener("click", (event) =>{
  event.preventDefault();    
  getPokemon();    
  clearElements(DOMElements.available_data_table);
});


