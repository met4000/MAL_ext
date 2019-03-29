console.log("Running animelab show injection script...");

var titleEl;
if ((titleEl = document.querySelector("body > div.site-wrapper > div.show-info-wrapper > div > div.row > div.col-md-8 > div > h1")) == null) {
  console.info("Cannot detect show details; is this a show page?");
} else {
  var show = fetch.byName(titleEl.innerText, modifyShow);
}


function modifyShow(show) {}
