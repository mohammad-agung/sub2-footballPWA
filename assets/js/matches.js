function setMatchScheduled(data) {
    let newData = data.matches.map(function (data) { return data });
    let arrDataScheduled = new Array();
    for (let i = 0; i < newData.length; i++) {
        if (newData[i].status === "SCHEDULED") {
            arrDataScheduled.push(newData[i]);
        }
    }

    let sortArr = arrDataScheduled.sort(function (a, b) {
        if (a.matchday < b.matchday) {
            return -1;
        }
        return 1;
    });

    let lastedMatchedHTML = "";
    let a = 1;
    let b = 1;

    getStandings().then(function (data) {
        match(data);
    })

    function match(result) {
        let standings = result[0].standings[0].table;
        sortArr.forEach(function (data) {
            let currentMatchDay = data.season.currentMatchday;
            let cM = parseInt(currentMatchDay);
            let m = parseInt(data.matchday);
            let imgHome = ""
            let imgAway = ""
            standings.forEach(crestUrl => {
                let idHomeDb = crestUrl.team;
                let idAwayDb = crestUrl.team;
                let idHome = data.homeTeam;
                let idAway = data.awayTeam;

                if (idHomeDb.id == idHome.id) {
                    imgHome = idHomeDb.crestUrl;
                    return imgHome
                }
                if (idAwayDb.id == idAway.id) {
                    imgAway = idAwayDb.crestUrl
                    return imgAway
                }
            })

            if (cM == m) {
                while (a > 0) {
                    lastedMatchedHTML +=
                        `<div class="row">
                        <div class="col s12">
                            <div class="head center">
                                <ul>
                                    <li>Matchday ${cM}</li>
                                </ul>
                            </div>
                        </div>  
                    </div>
                    <div class="row">`;

                    a = 0;
                }
                var dateResult = new Date(data.utcDate).toLocaleString();

                lastedMatchedHTML +=
                    `<div class="col s12 m6">
                    <div class="entry center">
                        <div class="scorer">
                            <ul>
                                <li id="home-image-result" class="logo-team">
                                    <img src="${imgHome}">
                                </li>
                                <li>`
                if (data.score.fullTime.homeTeam != null) {
                    lastedMatchedHTML += `${data.score.fullTime.homeTeam}`;
                }
                lastedMatchedHTML += `
                                </li>
                                    <li>:</li>
                                <li>`;
                if (data.score.fullTime.awayTeam != null) {
                    lastedMatchedHTML += `${data.score.fullTime.awayTeam}`;
                }
                lastedMatchedHTML += `
                                </li>
                                <li id="away-image-result" class="logo-team">
                                    <img src="${imgAway}">
                                </li>
                            </ul>
                        </div>
                        <div class="club-title">
                            <ul>
                                <li>${data.homeTeam.name}</li>
                                <li>Vs</li>
                                <li>${data.awayTeam.name}</li>
                            </ul>
                        </div>
                        <div class="date">
                            <ul>
                                <li>${dateResult}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;
            }

            if (cM + 1 == m) {
                while (b > 0) {
                    lastedMatchedHTML +=
                        `</div> 
                    <div class="row">
                        <div class="col s12">
                            <div class="head center">
                                <ul>
                                    <li>Matchday ${cM + 1}</li>
                                </ul>
                            </div>
                        </div>  
                    </div>
                    <div class="row">`;

                    b = 0;
                }
                var dateResult = new Date(data.utcDate).toLocaleString();

                lastedMatchedHTML +=
                    `<div class="col s12 m6">
                    <div class="entry center">
                        <div class="scorer">
                            <ul>
                                <li id="home-image-result" class="logo-team">
                                    <img src="${imgHome}">
                                </li>
                                <li>`
                if (data.score.fullTime.homeTeam != null) {
                    lastedMatchedHTML += `${data.score.fullTime.homeTeam}`;
                }
                lastedMatchedHTML += `
                                </li>
                                    <li>:</li>
                                <li>`;
                if (data.score.fullTime.awayTeam != null) {
                    lastedMatchedHTML += `${data.score.fullTime.awayTeam}`;
                }
                lastedMatchedHTML += `
                                </li>
                                <li id="away-image-result" class="logo-team">
                                    <img src="${imgAway}">
                                </li>
                            </ul>
                        </div>
                        <div class="club-title">
                            <ul>
                                <li>${data.homeTeam.name}</li>
                                <li>Vs</li>
                                <li>${data.awayTeam.name}</li>
                            </ul>
                        </div>
                        <div class="date">
                            <ul>
                                <li>${dateResult}</li>
                            </ul>
                        </div>
                    </div>
                </div>`;

            }

        });

        lastedMatchedHTML +=
            `</div>`;

        document.getElementById("latest-matches").innerHTML = lastedMatchedHTML;
    }
}