console.log("Running animelab card injection script...");


var cards = document.getElementsByClassName("card-content");
var details = [], secondaryDetails = [];

for (var i = 0; i < cards.length; i++) {
  details[i] = cards[i].querySelector("div > div.card-details");
  secondaryDetails[i] = cards[i].querySelector("div > div.card-wrapper > div.card-back-card > div");
  var title = details[i].querySelector("h4 > a").innerText;

  MAL.getByTitle(title, new Function(`modifyCard(` + i + `, arguments[0]);`));
}


function modifyCard(i, show) {
  var link = document.createElement("div");
  link.innerHTML = '<a href="' + show.url + '" class="btn btn-watch-instantly btn-full-width" title="View ' + show.title + ' on MAL"><span class="glyphicon"><img src="https://cdn.myanimelist.net/images/faviconv5.ico" /></span>View on MAL</a>';
  link = link.firstChild;
  details[i].insertBefore(link, details[i].children[2]);

  if (secondaryDetails[i] != null) {
    var score = document.createElement("div");
    score.classList = "block-full-width";
    score.innerHTML = '<h5 style="display: inline;">MAL Rating</h5><span style="float: right;">' + parseScore(show.score) + '</span>';
    secondaryDetails[i].insertBefore(score, secondaryDetails[i].children[2]);
  } else {
    console.info("Unable to get card back for " + show.title + " (i = " + i + ") - Is it an episode card?");
  }
}
