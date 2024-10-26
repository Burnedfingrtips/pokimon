const themeToggle = document.getElementById("themeToggle");
const dayImage = document.getElementById("dayIcon");
const nightImage = document.getElementById("nightIcon");
const ul = document.getElementById("searchList");
const input = document.getElementById("pokemonName");
const stats = document.getElementById("stats");
const error = document.getElementById("error");
const mini = document.querySelector(".mini"); // Change this selector to target your element
const pokeImage = document.querySelector("pokimonImage");
const gen2 = document.getElementById("gen2");
const gen1 = document.getElementById("gen1");

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
    console.log(allPokemons);
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
pokemonImage.addEventListener("click", async () => {
  if (pokemonImage.style.display === "block") {
    stats.style.display = "block";
  } else {
    stats.style.display = "none";
  }
});

function selectedGen() {}

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
      throw new Error("Invalid Pokémon name");
    }

    const data = await response.json();
    selectedPokemon = data;

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

pokemonImage.addEventListener("click", async () => {
  const pokemonName = input.value.toLowerCase();
  const errorElement = document.getElementById("error");
  stats.style.display = "none"; // Hide stats initially

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error("no stats");
    }

    const data = await response.json();
    const statsElement = document.getElementById("stats");

    // Build the stats display content
    const statsHtml = data.stats
      .map(
        (stat) => `
    <p>${stat.stat.name}: 
      <span class="stat-value" id="statValue">${stat.base_stat}</span>
    </p>`
      )
      .join("");
    statsElement.innerHTML = statsHtml; // Update the stats element with Pokémon stats
    stats.style.display = "block"; // Show the stats
  } catch (error) {
    console.error(error);
    errorElement.textContent = "An error occurred while fetching stats.";
  }
});

// Call fetchAllPokemons on page load

/*

final feature: project finally
- add generations buttons where you see the generations of the pokimon and can view the pokimon
- also include stats upon click
- ask for help on how to make it more efficient 
- after this make it a server as the api calls puts too much pressure on client side rending it slow

- add listener to the options and when you select the gen save the index and in your image when you display 
modify when index changes image changes. default gen1 
*/

gen1.addEventListener("click", async (event) => {
  event.preventDefault();
  fetchData();
});

gen2.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevents default anchor behavior

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
      throw new Error("Invalid Pokémon name");
    }

    const data = await response.json();
    selectedPokemon = data;

    const pokemonId = data.id; // Get the Pokémon's ID
    const showdownSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${pokemonId}.png`;
    const pokemonImage = document.getElementById("pokemonImage");

    // Update the image to the new Pokémon
    pokemonImage.src = showdownSpriteUrl;
    pokemonImage.style.display = "block"; // Show the image if it's hidden
    // Transparent background
  } catch (error) {
    console.error(error);
    errorElement.textContent = "Please put a valid Pokémon name";
  }
});

fetchAllPokemons();
