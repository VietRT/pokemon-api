import { DOMElements } from "/js/dom_modules.js";

import { 
  pokemonObject, 
  displayPokemon, 
  displayAppearOccurence, 
  // clearTypingsList, 
  // clearVersionsTable 
  clearElements
} from "/js/pokemon.js";

export const getPokemon = function() {

  const req = new XMLHttpRequest();
  req.open('GET', `https://pokeapi.co/api/v2/pokemon/${DOMElements.pokeSearch.value}`);
  req.responseType = "json";
  
  req.onload = function() {  

    if(req.status == 404) {
      DOMElements.notFound.id = `error-404-active`; //changed
      DOMElements.pokePic.id = `display-pokemon`; //changed
      clearElements(DOMElements.gamesList);
      // clearVersionsTable();
      clearElements(DOMElements.typesList);
      // clearTypingsList();

      document.querySelector("#display-pokemon-info").style.display = "none";
    }
    else {
      if(DOMElements.notFound.id === `error-404-active`) {
        DOMElements.notFound.id = `error-404`;  
      }     
      const load = req.response;     
      displayPokemon(load);
      displayAppearOccurence(load.game_indices);    
    }
  }
  req.send();
}

export const getSpecies = function() {
  const req = new XMLHttpRequest();
  req.open('GET', `https://pokeapi.co/api/v2/pokemon-species/${DOMElements.pokeSearch.value}`);
  req.responseType = "json";

  req.onreadystatechange = function () {
    if(req.readyState === 4 && req.status === 200) {
      pokemonObject.specie = req.response.evolution_chain.url;
      pokemonObject.evolutionChain = [];
      getEvolutions();
    }
  }
  req.send();
}

const getEvolutions = function() {
  const req = new XMLHttpRequest();
  req.open('GET', `${pokemonObject.specie}`);
  req.responseType = "json";

  req.onreadystatechange = function() {
    if(req.readyState === 4 && req.status) {
      pokemonObject.evolutionData = req.response.chain; //changed
      //console.log(evolutionData);      
      getAllEvolutionChain(pokemonObject.evolutionData); //changed
    }
  }
  req.send();
}

const getAllEvolutionChain = function(evoData) {
  do {
    let numberofEvo = evoData["evolves_to"].length;

    pokemonObject.evolutionChain.push({ //changed
      "species_name": evoData.species.name
    });

    //this case is for those with multiple evolutions per species like eevee
    if(numberofEvo > 1) {
      for(let i = 1; i<numberofEvo;i++) {
        pokemonObject.evolutionChain.push({ //changed
          "species_name": evoData.evolves_to[i].species.name
        });       
      }
    }
    //this will continiously loop inside of "evolves_to" property and the whole do while will stop once
    //the "evolves_to" property does not exist anymore
    evoData = evoData["evolves_to"][0];

  }while(evoData != undefined && evoData.hasOwnProperty("evolves_to"));
} 

export const getAllLocations = function() {
  const req = new XMLHttpRequest();
  req.open("GET", `https://pokeapi.co/api/v2/pokemon/${DOMElements.pokeSearch.value}/encounters`);
  req.responseType = "json";

  req.onload = function() {
    const load = req.response;
    pokemonObject.encounterLocation = load;
    //console.log(pokemonObject.encounterLocation);
  }
  req.send();
}