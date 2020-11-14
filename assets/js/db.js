let dbPromised = idb.open("football-data", 1, function (upgradeDb) {
    upgradeDb.createObjectStore("teams", { keyPath: "id" });
    upgradeDb.createObjectStore("standings", { keyPath: "competition.id" });
});

function saveStandings(data) {
    dbPromised
        .then(function (db) {
            let tx = db.transaction("standings", "readwrite");
            let store = tx.objectStore("standings");
            store.put(data);
            return tx.complete;
        })
}

function getStandings() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                let tx = db.transaction("standings", "readonly");
                let store = tx.objectStore("standings");
                return store.getAll();
            })
            .then(function (team) {
                resolve(team);
            }).catch(function () {
                reject(new Error("Database Not Found"));
            });
    });
}

function saveFavoriteTeam(data) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readwrite");
                var store = tx.objectStore("teams");
                store.put(data);
                return tx.complete;
            })
            .then(function (team) {
                resolve(team);
            }).catch(function () {
                reject(new Error("Database Not Found"));
            });
    });
}


function getFavoriteTeams() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (team) {
                resolve(team);
            }).catch(function () {
                reject(new Error("Database Not Found"));
            })
    });
}

function deleteFavoriteTeam(id) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.delete(id);
            return tx.complete;
        })
        .then(function () {
            notifDelFavTeam();
        }).catch(function () {
            console.log("Team Not Found");
        })

}