var lifestyle = require("lifestyle");
var fs = require("fs");

// var root = "https://cache.api.finn.no/iad/";
var root = "https://api.finn.no/iad/"
var key = "";

var client = new lifestyle.FinnClient(root, key);
var pendingAdIds;

function download() {
    if (pendingAdIds.length == 0) { return; }
    return client
        .getAd(pendingAdIds.shift())
        .then(emitAdEntry)
        .catch(emitError)
        .then(download);
}

function emitAdEntry(ad) {
    var id = ad.links.self.split(/\//g).pop(); // lol. Will fix the client so it gives out if
    process.stdout.write(id + "," + JSON.stringify(ad) + "\n");
}

function emitError(error) {
    process.stderr.write(error + "\n");
}

function main(adListPath, concurrency) {
    concurrency = concurrency || 1;
    pendingAdIds = fs.readFileSync(adListPath, 'utf8').trim().split('\n');

    for (var n = 0; n < concurrency; n++) {
        download().done();
    }
}

main(process.argv[2], process.argv[3]);
