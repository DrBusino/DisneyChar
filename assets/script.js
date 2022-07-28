const listCard = document.querySelector("#listCard");
const modalScreen = document.querySelector("#modalScreen");
const modalPicChar = document.querySelector("#modalPicChar");
const modalNameChar = document.querySelector("#modalNameChar");
const modalFilmsChar = document.querySelector("#modalFilmsChar");
const modalFilmsCharText = document.querySelector("#modalFilmsCharText");
const modalListFilmsChar = document.querySelector("#modalListFilmsChar");
const modalShortsChar = document.querySelector("#modalShortsChar");
const modalShortsCharText = document.querySelector("#modalShortsCharText");
const modalListShortsChar = document.querySelector("#modalListShortsChar");
const modalShowsChar = document.querySelector("#modalShowsChar");
const modalShowsCharText = document.querySelector("#modalShowsCharText");
const modalListShowsChar = document.querySelector("#modalListShowsChar");
const page = document.querySelector("#page");
const backPage = document.querySelector("#backPage");
const forPage = document.querySelector("#forPage");


const closeModal = document.querySelector("#closeModal");
let pageNum = 1;
async function getChar() {
  const resp = await fetch(`https://api.disneyapi.dev/characters?page=${pageNum}`);
  const lst = await resp.json();
  const list = lst.data;

  list.forEach((i) => {
    listCard.insertAdjacentHTML(
      "beforeend",

      `
           <div class="cardChar" id="${list.indexOf(i)}">
            <picture class="picChar"><img class="imgChar" src="${
              i.imageUrl
            }" alt="imgChar">
            <h3 class="nameChar">${i.name}</h2>
            </picture>


            
                  <article class="filmsChar">
                <h4 class="filmsCharText">Longas metragens:</h3>
                <p class="filmsCharCount">${i.films.length}</p>
            </article>

            <article class="shortsChar">
                <h4 class="shortsCharText">Curtas-metragens:</h3>
                <p class="shortsCharCount">${i.shortFilms.length}</p>
            </article>

            
            <article class="showsChar">
                <h4 class="ShowsCharText">Programas de TV:</h3>
                <p class="ShowsCharCount">${i.tvShows.length}</p>
            </article>

            
          
        </div>
         `
    );
  });

  const cardChar = document.querySelectorAll(".cardChar");

  cardChar.forEach((card) => {
    card.addEventListener("click", () => {
      

      const thisCard = list[card.id];
      modalImgChar.src = thisCard.imageUrl;
      modalNameChar.innerHTML = thisCard.name;

      if (thisCard.films.length > 0) {
        thisCard.films.forEach((film) => {
          const li = document.createElement("li");
          li.innerText = film;
          modalListFilmsChar.appendChild(li);
        });
      } else  {
        modalListFilmsChar.innerText =
          "Este personagem não participa de nenhum longa metragem";
      }

      if (thisCard.shortFilms.length > 0) {
        thisCard.shortFilms.forEach((film) => {
          const li = document.createElement("li");
          li.innerText = film;
          modalListShortsChar.appendChild(li);
        });
      } else  {
        modalListShortsChar.innerText =
          "Este personagem não participa de nenhum curta metragem";
      }

      
      if (thisCard.tvShows.length > 0) {
        thisCard.tvShows.forEach((film) => {
          const li = document.createElement("li");
          li.innerText = film;
          modalListShowsChar.appendChild(li);
        });
      } else  {
        modalListShowsChar.innerText =
          "Este personagem não participa de nenhum programa de tv";
      }

      modalScreen.hidden = false;
    });
  });
}

modalScreen.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) {
    modalScreen.hidden = true;
    modalListFilmsChar.innerHTML = "";
    modalListShortsChar.innerHTML = "";
    modalListShowsChar.innerHTML="";
  }
});

closeModal.addEventListener("click", ()=>{
  modalScreen.hidden = true;
})

page.innerText = pageNum;


  
backPage.addEventListener("click", () => {
  if (page > 1) {
    pageNum = pageNum - 1;
    page.innerText = pageNum;
    getChar();
  }
});
  
forPage.addEventListener("click", ()=>{
   
 pageNum ++;
   page.innerText = pageNum;
   getChar();

})

getChar();
