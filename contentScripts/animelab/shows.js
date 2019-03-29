console.log("Running animelab show injection script...");

var titleEl;
var seasons = [];

if ((titleEl = document.querySelector("body > div.site-wrapper > div.show-info-wrapper > div > div.row > div.col-md-8 > div > h1")) == null) {
  console.info("Cannot detect show details; is this a show page?");
} else {
  for (var header, i = 1; (header = document.querySelector("#season-listing-accordian > h4:nth-child(" + i + ")")) != null; i += 2) {
    if ((i + 1) / 2 > 100) {
      console.error("Suspected Infinite Loop: Season eval terminated at >100 iterations");
      break;
    }

    // var s = /\s(\d+)/.exec(header.querySelector("a").innerText)[1]; // season number
    var query = titleEl.innerText + " " + header.querySelector("a").innerText;
    seasons.push(header);
    fetch.byTitle(query, new Function(`modifyShow(` + (seasons.length - 1) + `, arguments[0]);`));
  }
}


function modifyShow(i, show) {
  seasons[i].querySelector("a").innerText += " - " + show.score;
}
