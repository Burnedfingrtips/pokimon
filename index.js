const themeToggle = document.getElementById("themeToggle");
const dayImage = document.getElementById("dayIcon");
const nightImage = document.getElementById("nightIcon");
const ul = document.getElementById("searchList");
const input = document.getElementById("pokemonName");
const stats = document.getElementById("stats");
const error = document.getElementById("error");
const mini = document.querySelector(".mini"); // Change this selector to target your element
const gen = document.getElementById("dropdownMenuButton");
const gen2 = document.getElementById("gen2");
const gen1 = document.getElementById("gen1");
const gen3 = document.getElementById("gen3");
const gen4 = document.getElementById("gen4");
const gen5 = document.getElementById("gen5");
const gen6 = document.getElementById("gen6");
const gen7 = document.getElementById("gen7");
const gen8 = document.getElementById("gen8");
const gen9 = document.getElementById("gen9");

// if pokedex is clicked page will reload
mini.addEventListener("click", function () {
  location.reload(); // This will reload the page
});

themeToggle.addEventListener("click", function () {
  const divWithBackground = document.getElementById("divWithBackground");

  // Check if the dark mode is currently active
  if (divWithBackground.classList.contains("dark-mode")) {
    // If dark mode is active, switch to light mode
    divWithBackground.classList.remove("dark-mode");
    divWithBackground.classList.add("light-mode");

    error.style.color = "red";
    nightIcon.style.display = "block"; // Show night icon
    dayIcon.style.display = "none"; // Hide day icon
  } else {
    // If light mode is active, switch to dark mode
    divWithBackground.classList.remove("light-mode");
    divWithBackground.classList.add("dark-mode");
    error.style.color = "white";
    nightIcon.style.display = "none"; // Hide night icon
    dayIcon.style.display = "block"; // Show day icon
  }
});

// Check the display value

let allPokemons = [];

// Fetch all Pokémon names (limit to 151)
async function fetchAllPokemons() {
  if (allPokemons.length === 0) {
    // Only fetch if not already fetched
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await response.json();
    allPokemons = data.results.map((pokemon) => pokemon.name);
  }
}

// Add event listener for input changes
input.addEventListener("input", function () {
  if (input.value !== "") {
    filterPokemons(); // Filter as the user types
    stats.style.display = "none";
    stats.textContent = "";
    pokemonImage.style.display = "none";
  } else {
    ul.style.display = "none"; // Hide the list when input is empty
    stats.style.display = "none";
    stats.textContent = "";
    pokemonImage.style.display = "none";
    gen.style.display = "none";
  }
});

pokemonName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    if (input.value !== "") {
      fetchData(); // Filter on Enter key press
      stats.style.display = "none";
      pokemonImage.style.display = "none";
      input.value = "";
    } else {
      ul.style.display = "none"; // Hide the list when input is empty
    }
  }
});
// toggle

// Filter Pokémon names
function filterPokemons() {
  const searchTerm = input.value.toLowerCase();
  ul.innerHTML = ""; // Clear the current list

  const filteredPokemons = allPokemons
    .filter((pokemon) => pokemon.toLowerCase().startsWith(searchTerm))
    .sort();

  filteredPokemons.forEach((pokemon) => {
    const li = document.createElement("li");
    li.textContent = pokemon;
    li.addEventListener("click", () => {
      input.value = pokemon;
      fetchData(); // Fetch data for the selected Pokémon
      ul.innerHTML = ""; // Clear the list after selection
    });
    ul.appendChild(li);
  });

  ul.style.display = filteredPokemons.length > 0 ? "block" : "none";
}

//now add a stats function when pokimon is clicked if pokimon is visible
pokemonImage.addEventListener("click", () => {
  if (pokemonImage.style.display === "block") {
    stats.style.display = "block";
  }
});
stats.addEventListener("click", () => {
  if (stats.style.display === "block") {
    stats.style.display = "none";
  }
});

//how to change pokimon image

// Fetch detailed Pokémon data
async function fetchData() {
  const errorElement = document.getElementById("error");
  const pokemonName = input.value.toLowerCase();
  ul.innerHTML = ""; // Clear the list
  errorElement.textContent = ""; // Clear previous error

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      errorElement.textContent = "Please enter a valid Pokémon name";
      errorElement.style.color = "red";
      gen.style.display = "none";
      throw new Error("Invalid Pokémon name");
    }

    const data = await response.json();
    selectedPokemon = data;
    gen.style.display = "block";
    const pokemonId = data.id; // Get the Pokémon's ID
    const showdownSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemonId}.gif`;
    const pokemonImage = document.getElementById("pokemonImage");
    //when you call the gen selector update this image
    pokemonImage.src = showdownSpriteUrl; //link to updated image // Set the showdown sprite URL as the image source
    pokemonImage.style.display = "block"; // Show the image
  } catch (error) {
    console.error(error);
    errorElement.textContent = "Please put a valid pokemon name";
  }
}
// function selectgen() => take id and then map id to image
//store data in global variable

// const arrayOfImages = ['image1.jpg','image2.jpg',''image3.jpg'']
// const gens = ['gen1.jpg','gen2.jpg',''gen3.jpg'']
// onSelect(index)=> { return gens[index]}

fetchAllPokemons();
