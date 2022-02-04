// FETCHING THE NEWS
let topics = [
  "breaking-news",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];
let topicNo = 0;
let fetchNews = async () => {
  const apiKey = "548bc59c45643ef429411963c536c34a";
  let req = await fetch(
    `https://gnews.io/api/v4/top-headlines?topic=${topics[topicNo]}&lang=en&token=${apiKey}`
  );
  //
  let res = await req.json();
  if (topicNo == topics.length) {
    topicNo = 0;
  }
  console.log(topics[topicNo]);
  topicNo++;
  let parent = document.getElementById("parent");
  res.articles.forEach((elem) => {
    let publishDate = new Date(elem.publishedAt).toLocaleDateString("id");
    parent.innerHTML += `
        <div class="card">
      <img src="${elem.image}" id="thumbnailImg" class="card-img-top" alt="[Image]" loading="lazy"/>
      <div class="card-body">
        <h5 class="card-title">${elem.title} <span class="badge rounded-pill bg-secondary">${elem.source.name}</span></h5>
        <p class="publishDate">Published: ${publishDate}</p>
        <p class="card-text">${elem.content}</p>
        <a href="${elem.url}" class="btn btn-primary">Read Full Article</a>
      </div>
    </div>`;
  });
  setTimeout(() => {
    document
      .querySelectorAll("#thumbnailImg")
      .forEach((e) => (e.style.filter = "unset"));
  }, 3000);
};
fetchNews();
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop == scrollHeight) {
    fetchNews();
  }
});
