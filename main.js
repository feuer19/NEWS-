//API
const API_KEY = "8880e04845964d05a6f47051baf05ff6";
const url = "https://newsapi.org/v2/top-headlines?country=kr&pageSize=10";

//변수
let news = [];
let response;
let keyword;
let page = 1;
let total_pages = 0;
let searchButton = document.getElementById("search-button");
let menus = document.querySelectorAll(".menus button");
let searchInput = document.getElementById("search-input");

// API 호출 함수
const getNews = async () => {
  try {
    let data = await response.json();
    if (response.status == 200) {
      news = data.articles;
      console.log("데이터는?", data);
      render();
    } else {
      //에러 핸들링
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("에러는", error.message);
    errorRender(error.message);
  }
};

// 최신 뉴스
const getLatesNews = async () => {
  response = await fetch(`${url}&apiKey=${API_KEY}`);
  getNews();
};

//카테고리별 검색
const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  response = await fetch(`${url}&category=${topic}&apiKey=${API_KEY}`);
  getNews();
};

//키워드별 검색
const getNewsBykeyWord = async () => {
  keyword = document.getElementById("search-input").value;
  response = await fetch(
    `https://newsapi.org/v2/everything?q=${keyword}&from=2023-07-15&sortBy=popularity&apiKey=${API_KEY}`
  );
  getNews();
};

//화면 렌더링
const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
    <div class="col-lg-4">
      <img class="new-img-size" src="${item.urlToImage}" />
    </div>
    <div class="col-lg-8 news_text">
      <h2>${item.title}</h2>
      <p>${item.description}</p>
      <div class="rights">${item.source.name} * ${item.publishedAt}</div>
    </div>
  </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

//에러
const errorRender = (error) => {
  let errorHTML = `<h3 class="text-center alert alert-danger mt-1">${error}</h3>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

//카테고리 클릭 이벤트
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByTopic(event))
);

// 버튼 클릭 이벤트
searchButton.addEventListener("click", getNewsBykeyWord);

// 키보드 엔터 이벤트
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    getNewsBykeyWord();
  }
});

getLatesNews();

// 사이드 버튼
const openNav = () => {
  document.getElementById("mySidenav").style.width = "400px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};
