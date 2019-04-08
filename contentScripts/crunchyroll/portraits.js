console.log("Running crunchyroll portrait injection script...");


var portraits = document.getElementsByClassName("wrapper container-shadow");

for (var i = 0; i < portraits.length; i++) {
  var title = portraits[i].querySelector("a > span.series-title.block.ellipsis").innerText;

  MAL.getByTitle(title, new Function(`modifyPortrait(` + i + `, arguments[0]);`));
}


function modifyPortrait(i, show) {
  var info = portraits[i].querySelector("a > span.series-data.block.ellipsis");
  info.innerHTML = '<span>' + info.innerHTML + '</span><span title="' + show.title + '" style="float: right;">' + parseScore(show.score) + '</span>';

  // var olink = portaits[i].querySelector("button");
  // var link = olink.cloneNode(); // shouldn't clone it - WIP
  // olink.style += "top: 140px;";
}
