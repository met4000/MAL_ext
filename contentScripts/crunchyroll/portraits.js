console.log("Running crunchyroll portrait injection script...");


var portraits = document.getElementsByClassName("portrait-element");

for (var i = 0; i < portraits.length; i++) {
  var title = portraits[i].querySelector("span.series-title.block.ellipsis").innerText;

  MAL.getByTitle(title, new Function(`modifyPortrait(` + i + `, arguments[0]);`));
}


function modifyPortrait(i, show) {
  var info = portraits[i].querySelector("span.series-data.block.ellipsis");
  info.innerHTML = '<span>' + info.innerHTML + '</span><span style="float: right;">' + parseScore(show.score) + '</span>';

  // var link = document.createElement("div");
}
