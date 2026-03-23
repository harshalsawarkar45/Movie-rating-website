const apiKey = "8f9c816c";

const search = document.getElementById("search");
const searchContainer = document.getElementById("searchMovies");
const defaultContainer = document.getElementById("defaultMovies");

search.addEventListener("keyup", function () {

  let movie = this.value;

  if (movie.length < 3) return;

  defaultContainer.style.display = "none"; 

  fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      searchContainer.innerHTML = "";

      if (data.Search) {

        data.Search.slice(0, 10).forEach(m => {

          let div = document.createElement("div");
          div.className = "card";

          div.innerHTML = `
            <img src="${m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/200x300"}">
            <h2>${m.Title}</h2>
            <p>${m.Year}</p>

            <div class="stars">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
          `;

          searchContainer.appendChild(div);
        });

      }
    });
});


document.addEventListener("click", function (e) {

  if (e.target.tagName === "SPAN" && e.target.parentElement.classList.contains("stars")) {

    let stars = e.target.parentElement.querySelectorAll("span");

    stars.forEach(s => s.classList.remove("active"));

    let index = Array.from(stars).indexOf(e.target);

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("active");
    }

  }

});