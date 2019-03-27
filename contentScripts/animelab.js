console.log("Running MAL_ext animelab injection script...");


var cards = document.getElementsByClassName("card-content");
var details = [];

for (var i = 0; i < cards.length; i++) {
  details[i] = cards[i].querySelector("div > div.card-details");
  var title = details[i].querySelector("h4 > a").innerText;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = new Function(`
    if (this.readyState == 4 && this.status == 200) {
      var show = JSON.parse(this.responseText).results[0];
      
      var node = document.createElement("div");
      node.innerHTML = '<a href="' + show.url + '" class="btn btn-watch-instantly btn-full-width"><span class="glyphicon"><img src="https://cdn.myanimelist.net/images/faviconv5.ico"></span>View on MAL</a>';
      node = node.firstChild;
      details[` + i + `].insertBefore(node, details[` + i + `].children[2]);
    }
  `);
  xhttp.open("GET", "https://api.jikan.moe/v3/search/anime?q=" + title);
  xhttp.send();
}
