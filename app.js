const form = document.querySelector("form");
const input = document.querySelector("form input");
const body = document.querySelector("body");

// const API_KEY = "709d27e2a7a7bd8a37765ff1b1717928";
localStorage.setItem("API_KEY", "+lSD63jYEwbnNUNAL2XqDucMfucgfr5GdgE8bB34NYZRciAJCk090SNmeKakXIls")



form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherApp(input.value);
  form.reset();
});

const weatherApp = async (val) => {
  const API_KEY = DecryptStringAES(localStorage.getItem("API_KEY"));
    

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&units=metric&appid=${API_KEY}&lang=tr`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`something went wrong ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    renderApi(data);
  } catch (error) {
    renderError();
  }
};

const renderError = (err) => {
  const errDiv = document.querySelector(".err");
  errDiv.innerHTML = `<img src="./img/404.png" alt="hata"`;
};

const renderApi = (data) => {
  const { name, main, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  body.style.backgroundImage = `url(./img/${weather[0].icon}.jpg)`;
  const cardDiv = document.querySelector("#card-div");
  cardDiv.innerHTML = `
    <div class="card text-center">
    <h3 class="card-text"><span>${name.toUpperCase()}</span></h3>

    <p class="temp d-flex aling-item-center justify-content-center">${Math.floor(
      main.temp
    )} <span>°C</span></p>
    
    <p class="desc">${weather[0].description.toUpperCase()}</p>
    <p clas="url"><img src=${iconUrl} class="img" width="45px" alt="..."></p>

</div>`;
};
