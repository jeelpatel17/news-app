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
    <img
      src="${elem.image}"
      id="thumbnailImg"
      width="100%"
      height="auto"
      class="card-img-top"
      alt="[A-Thumbnail-Image-Should-Be-Here]"
      loading="lazy"
    />
    <div class="card-body">
      <h3 class="card-title">
        ${elem.title}
        <span class="badge rounded-pill bg-secondary"
          >${elem.source.name}</span
        >
      </h3>
      <p class="publishDate">Published: ${publishDate}</p>
      <p class="card-text">${elem.content}</p>
      <a href="${elem.url}" class="btn">Read Full Article</a>
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
