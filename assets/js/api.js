const apiKey = "09c214c35dac49f5b893c407d829416b";
const baseUrl = "https://api.football-data.org/v2/";

function getLeague() {
    if ("caches" in window) {
        caches.match(`${baseUrl}competitions/2014/standings`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setStandings(data)
                    });
            }
        })
    }

    if ("caches" in window) {
        caches.match(`${baseUrl}competitions/2014/scorers`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setScorer(data)
                    });
            }
        })
    }

    fetch(`${baseUrl}competitions/2014/standings`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(response => {
            return response.json()
        })
        .then(responseJson => setStandings(responseJson))
        .catch(error => console.log(error))

    fetch(`${baseUrl}competitions/2014/scorers`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(response => {
            return response.json()
        })
        .then(responseJson => setScorer(responseJson))
        .catch(error => console.log(error))

}

function getMatchesScheduled() {
    if ("caches" in window) {
        caches.match(`${baseUrl}competitions/2014/matches?status=SCHEDULED`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setMatchScheduled(data)
                    });
            }
        })
    }

    fetch(`${baseUrl}competitions/2014/matches?status=SCHEDULED`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(response => {
            return response.json()
        })
        .then(responseJson => setMatchScheduled(responseJson))
        .catch(error => console.log(error))
}

function getMatchesFinished() {
    if ("caches" in window) {
        caches.match(`${baseUrl}competitions/2014/matches`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setMatchFinish(data)
                    });
            }
        })
    }

    fetch(`${baseUrl}competitions/2014/matches`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    })
        .then(response => {
            return response.json()
        })
        .then(responseJson => setMatchFinish(responseJson))
        .catch(error => console.log(error))
}

function getTeam() {

    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${baseUrl}teams/${idParam}`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setTeamsById(data)
                    });
            }
        })
    }

    fetch(`${baseUrl}teams/${idParam}`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    }).then(response => {
        return response.json()
    })
        .then(responseJson => setTeamsById(responseJson))
        .catch(error => console.log(error))
}

function getPlayer() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${baseUrl}players/${idParam}`).then(function (response) {
            if (response) {
                response.json()
                    .then(function (data) {
                        setPlayer(data)
                    });
            }
        })
    }

    fetch(`${baseUrl}players/${idParam}`, {
        headers: {
            'X-Auth-Token': apiKey
        }
    }).then(response => {
        return response.json()
    })
        .then(responseJson => setPlayer(responseJson))
        .catch(error => console.log(error))
}