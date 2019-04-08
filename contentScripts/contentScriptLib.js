var manifest = { name: "_MAL_ext", version: "X.X.X" };

var manifestRequest = new XMLHttpRequest();
manifestRequest.open("GET", chrome.extension.getURL("manifest.json"), false);
manifestRequest.send();

if (manifestRequest.status === 200) {
  manifest = JSON.parse(manifestRequest.responseText);
} else console.warn("Unable to load MAL_ext manifest");

console.log("Loading " + manifest.name + " v" + manifest.version);


// Console override

console.raw = {};
for (var t = ["log", "info", "warn", "error"], i = 0; i < t.length; i++) {
  console.raw[t[i]] = console[t[i]];
  console[t[i]] = new Function(`var args = []; for (var i in arguments) args.push(arguments[i]); console.raw.` + t[i] + `.apply(this, ["` + manifest.name + `:"].concat(args));`);
}


// Fetch funcs

var MAL = {};
MAL.getByTitle = function (title, callback) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = new Function(`
    if (this.readyState == 4 && this.status == 200) (` + callback.toString() + `)(JSON.parse(this.responseText).results[0]);
  `);

  xhttp.open("GET", "https://api.jikan.moe/v3/search/anime?q=" + title);
  xhttp.send();
};


// misc

function parseScore(score) {
  var internal = score.toString();
  if (internal == "10") return "10.0";

  if (internal.length == 1) internal += ".";
  while (internal.length < 4) internal += "0";

  return internal;
}
