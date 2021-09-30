"use strict"

import {DOMElements} from "/js/dom_modules.js";
import {getPokemon} from "/js/fetch.js";
import {pokemonObject, clearEvolutionsList} from "/js/pokemon.js"

DOMElements.evolution_data.addEventListener("click", (event) =>{
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
});

document.addEventListener("click", (event) => {
  switch (event.target && event.target.id) {
    case "game-version":
      event.preventDefault();
      document.querySelector("#display-pokemon-info").style.display = "table";
      break;
    case "evolution-specie":
      event.preventDefault();
      DOMElements.pokeSearch.value = event.target.className;
      getPokemon(DOMElements.pokeSearch.value)
  }

});

DOMElements.searchBtn.addEventListener("click", (event) =>{
  event.preventDefault();    
  getPokemon(DOMElements.pokeSearch.value);
  clearEvolutionsList();  
});


































document.addEventListener("keypress", (event) => {
  if(event.key === 13) {
    event.preventDefault();
    getPokemon(); 
  }
});