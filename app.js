const searchBar = document.getElementById("search-bar");
const characterBox = document.getElementById("character-box");

searchBar.addEventListener("submit", function (event) {
  event.preventDefault();
  const searchTerm = searchBar.querySelector("input").value;
  getCharacters(searchTerm);
});

function getCharacterId(url) {
  const idRegExp = /\/(\d+)\/$/;
  return url.match(idRegExp)[1];
}

function getCharacters(searchTerm) {
  const baseUrl = "https://swapi.dev/api/people/?search=";
  const url = baseUrl + searchTerm;
  axios
    .get(url)
    .then((response) => {
      const results = response.data.results;
      characterBox.innerHTML = "";
      if (results && results.length > 0) {
        document.querySelector(".info-panel").style.display = "flex";
        for (let i = 0; i < results.length; i++) {
          const character = document.createElement("div");
          character.classList.add("character");
          const characterUrl = results[i].url;
          character.innerHTML = `
                <h2>${results[i].name}</h2>
                <p>Born: ${results[i].birth_year}</p>
                <p>Height: ${results[i].height}cm</p>
                <p>Gender: ${results[i].gender}</p>
                <p>Eye color: ${results[i].eye_color}</p>
                <p>Hair color: ${results[i].hair_color}</p>
                <p>Home planet: </p>
              </a>
            `;
          characterBox.appendChild(character);
          axios
            .get(results[i].homeworld)
            .then((response) => {
              character.querySelector("p:last-child").textContent =
                "Home planet: " + response.data.name;
            })
            .catch((error) => console.log(error));
          const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${getCharacterId(
            results[i].url
          )}.jpg`;
          const imageBox = document.getElementById("image-box");
          imageBox.style.backgroundImage = `url('${imageUrl}')`;
        }
      }
    })
    .catch((error) => console.log(error));
}
