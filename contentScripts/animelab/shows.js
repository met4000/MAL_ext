console.log("Running animelab show injection script...");

// Note: commented out code is old score disp (on each season tab)

var titleEl;
var seasons = [];

if ((titleEl = document.querySelector("body > div.site-wrapper > div.show-info-wrapper > div > div.row > div.col-md-8 > div > h1")) == null) {
  console.info("Cannot detect show details; is this a show page?");
// } else {
//   for (var header, i = 1; (header = document.querySelector("#season-listing-accordian > h4:nth-child(" + i + ")")) != null; i += 2) {
//     if ((i + 1) / 2 > 100) {
//       console.error("Suspected Infinite Loop: Season eval terminated at >100 iterations");
//       break;
//     }

//     // var s = /\s(\d+)/.exec(header.querySelector("a").innerText)[1]; // season number
//     var query = titleEl.innerText + " " + header.querySelector("a").innerText;
//     seasons.push(header);
//     MAL.getByTitle(query, new Function(`modifyShow(` + (seasons.length - 1) + `, arguments[0]);`));
//   }
// }
} else {
  var dispMAL = document.createElement("div");
  dispMAL.innerHTML = `<div id="MAL-ratings-container" class="sidebar-group"><div style="width: 240px;"><h5>MAL Rating</h5></div></div>`;
  dispMAL = dispMAL.firstChild;
  document.querySelector("#user-controls-container > div").insertBefore(dispMAL, document.querySelector("#ratings-breakdown-container"));
  var disp = document.querySelector("#MAL-ratings-container > div");

  var seasonTitles = [];

  for (var header, i = 1; (header = document.querySelector("#season-listing-accordian > h4:nth-child(" + i + ")")) != null; i += 2) {
    if ((i + 1) / 2 > 100) {
      console.error("Suspected Infinite Loop: Season eval terminated at >100 iterations");
      break;
    }

    var seasonTitle = header.querySelector("a").innerText;

    var season = document.createElement("div");
    season.innerHTML = `<a title="View on MAL"><p style="margin: 0 0 8px;"><span style="display: inline-block; width: 200px;">` + seasonTitle + `</span><span style="float: right;">~</span></p></a>`;
    season = season.firstChild;

    seasons.push(disp.appendChild(season));
    seasonTitles.push(seasonTitle);
  }

  if (seasonTitles.length == 1) {
    var query = titleEl.innerText;
    MAL.getByTitle(query, new Function(`modifyShow(0, arguments[0]);`));
  } else for (var i in seasonTitles) {
    var query = titleEl.innerText + " " + seasonTitles[i];
    MAL.getByTitle(query, new Function(`modifyShow(` + i + `, arguments[0]);`));
  }
}


// function modifyShow(i, show) {
//   var disp = document.createElement("div");
//   disp.innerHTML = `<span title="View on MAL"><a href="` + show.url + `" style="display: inline;" onclick="document.body.innerHTML='';window.location.href=this.href;">(` + show.score + `)</a></span>`;
//   disp = disp.firstChild;
//   seasons[i].querySelector("a").insertBefore(disp, seasons[i].querySelector("a > span.glyphicon.al-plus").nextSibling);
// }
function modifyShow(i, show) {
  seasons[i].href = show.url;
  seasons[i].querySelector("p > span:nth-child(2)").innerHTML = show.score;
}
