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
  const apiKey = process.env.NEWS_API_KEY;
  let req = await fetch(
    `https://gnews.io/api/v4/top-headlines?topic=${topics[topicNo]}&lang=en&token=${apiKey}`,
    {
      "Content-Security-Policy": "default-src https://gnews.io",
    }
  );
  //
  let res = await req.json();
  if (topicNo == topics.length) {
    topicNo = 0;
  }
  // console.log(topics[topicNo]);
  topicNo++;
  let parent = document.getElementById("parent");
  res.articles.forEach((elem) => {
    // console.log();
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
        <span class="badge"
          >${elem.source.name}</span
        >
      </h3>
      <p class="publishDate">Published: ${publishDate}</p>
      <p class="card-text">${elem.content.slice(
        0,
        elem.content.length - 12
      )}</p>
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
  // console.log("Scroll height: ", scrollHeight);
  if (clientHeight + (scrollTop + 200) >= scrollHeight) {
    // console.log("true");
    fetchNews();
  }
});
