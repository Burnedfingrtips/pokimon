const themeToggle = document.getElementById("themeToggle");
const dayImage = document.getElementById("dayIcon");
const nightImage = document.getElementById("nightIcon");
const ul = document.getElementById("searchList");
const input = document.getElementById("pokemonName");

themeToggle.addEventListener("click", function () {
  if (dayIcon.style.display === "block") {
    document.getElementById("divWithBackground").classList.remove("light-mode");
    document.getElementById("divWithBackground").classList.add("dark-mode"); // Remove dark mode class

    nightIcon.style.display = "block"; // Show night icon
    dayIcon.style.display = "none"; // Hide day icon
  } else {
    // If night icon is visible, remove dark mode and switch to day icon
    document;
    document.getElementById("divWithBackground").classList.remove("dark-mode");
    document.getElementById("divWithBackground").classList.add("light-mode"); // Remove dark mode class

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
  } else {
    ul.style.display = "none"; // Hide the list when input is empty
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
//also fix the logic behind the search 






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
    const sprite = data.sprites.front_default;
    const pokemonImage = document.getElementById("pokemonImage");
    pokemonImage.src = sprite; // Update the image source
    pokemonImage.style.display = "block"; // Show the image

    


  } catch (error) {
    console.error(error);
    errorElement.textContent = "An error occurred while fetching Pokémon data.";
  }
}

// Call fetchAllPokemons on page load
fetchAllPokemons();



//for alerts do document.dad.classList instead of the whole