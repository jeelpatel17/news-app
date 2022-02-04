// FETCHING THE NEWS
let pageNo = 1;
let fetchNews = async () => {
  const apiKey = "548bc59c45643ef429411963c536c34a";
  let req = await fetch(
    `https://gnews.io/api/v4/search?q=bitcoin&page=${pageNo}&token=${apiKey}`
  );
  //
  // console.log();
  let res = await req.json();
  console.log(res);
  pageNo++;
  let parent = document.getElementById("parent");
  res.articles.forEach((elem) => {
    let publishDate = new Date(elem.publishedAt).toLocaleDateString("id");
    parent.innerHTML += `
        <div class="card my-3 mx-auto">
      <img src="${elem.image}" id="thumbnailImg" class="card-img-top" alt="[Image]" loading="lazy"/>
      <div class="card-body">
        <h5 class="card-title fw-bold">${elem.title} <span class="badge rounded-pill bg-secondary">${elem.source.name}</span></h5>
        <p class="publishDate">Published: ${publishDate}</p>
        <p class="card-text">${elem.content}</p>
        <a href="${elem.url}" class="btn btn-primary">Read Full Article</a>
      </div>
    </div>`;
  });
};
fetchNews();
setTimeout(() => {
  document
    .querySelectorAll("#thumbnailImg")
    .forEach((e) => (e.style.filter = "unset"));
}, 3000);
// document.getElementById("thumbnailImg").style.filter = "blur(5px);";
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (clientHeight + scrollTop == scrollHeight) {
    fetchNews();
  }
});
