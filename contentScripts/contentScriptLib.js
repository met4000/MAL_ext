// Console override

console.raw = {};
for (var t = ["log", "info", "warn", "error"], i = 0; i < t.length; i++) {
  console.raw[t[i]] = console[t[i]];
  console[t[i]] = new Function(`var args = []; for (var i in arguments) args.push(arguments[i]); console.raw.` + t[i] + `.apply(this, ["MAL_ext:"].concat(args));`);
}


// Fetch funcs

var fetch = {};
fetch.byTitle = function (title, callback) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = new Function(`
    if (this.readyState == 4 && this.status == 200) (` + callback.toString() + `)(JSON.parse(this.responseText).results[0]);
  `);

  xhttp.open("GET", "https://api.jikan.moe/v3/search/anime?q=" + title);
  xhttp.send();
};
