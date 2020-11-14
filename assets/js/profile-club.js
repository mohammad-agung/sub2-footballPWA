function setTeamsById(data) {
    let teamsHTML = `
        <div class="col s12 m6">
            <div class="pages-title center">
                <h3>Profile Club</h3>
            </div>
            <div class="card">
                <div class="card-content">
                    <div class="row">
                        <div class="col s12 center">
                            <img src="${data.crestUrl}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s5">Fullname</div>
                        <div class="col s7" id="teamName">: ${data.name}</div>
                    </div>
                    <div class="row">
                        <div class="col s5">Shortname</div>
                        <div class="col s7">: ${data.shortName}</div>
                    </div>
                    <div class="row">
                        <div class="col s5">Founded</div>
                        <div class="col s7">: ${data.founded}</div>
                    </div>
                    <div class="row">
                        <div class="col s5">Manager</div>
                        <div class="col s7">: `;
    let coach = data.squad;
    coach.forEach(function (data) {
        if (data.role == "COACH") {
            let coachName = data.name;
            teamsHTML += `${coachName} ,`;
        }
    });
    teamsHTML += `  </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12 m6">
            <div class="pages-title center">
                <h3>Squads</h3>
            </div>
            <div class="card">
                <div class="card-content">
                    <div class="row head">
                        <div class="col s2">#</div>
                        <div class="col s3">Pos</div>
                        <div class="col s7">Player</div>
                    </div>`;
    let number = 1;
    coach.forEach(function (data) {
        if (data.role == "PLAYER") {

            teamsHTML += `
                    <div class="row">
                        <div class="col s2">${number++}</div>
                        <div class="col s3">`;
            if (data.position === "Goalkeeper") {
                teamsHTML += 'GK';
            } else if (data.position === "Defender") {
                teamsHTML += 'DF';
            } else if (data.position === "Midfielder") {
                teamsHTML += "MF";
            } else if (data.position === "Attacker") {
                teamsHTML += "CF";
            }
            teamsHTML += `
                        </div>
                        <div class="col s7"><a href="/profile-player.html?id=${data.id}">${data.name}</a></div>
                    </div>`;
        }
    });

    teamsHTML += ` 
                </div>
            </div>
        </div>`;
    document.getElementById("profile_club").innerHTML = teamsHTML;

    let teamId = data.id;
    let teamName = data.name;
    getFavoriteTeams().then(function (items) {
        cekFavoriteTeam(items);
    })

    function cekFavoriteTeam(item) {
        let tombol = document.getElementById("tombol");

        if (item.length == 0) {
            let tombolSaveHtml =
                `<div class="fixed-action-btn" id="save">
                    <a class="btn-floating btn-large pulse green">
                        <i class="large material-icons">favorite</i>
                    </a>
                </div>`;

            tombol.innerHTML = tombolSaveHtml;

            saveItem();
        } else {
            for (let i = 0; i < item.length; i++) {
                if (parseInt(teamId) == parseInt(item[i].id)) {
                    let tombolDeleteHtml =
                        `<div class="fixed-action-btn" id="delete" data-id="${teamId}">
                                    <a class="btn-floating btn-large pulse red">
                                        <i class="large material-icons">delete</i>
                                    </a>
                                </div>`;

                    tombol.innerHTML = tombolDeleteHtml;

                    deleteItem();
                    break;
                } else {
                    let tombolSaveHtml =
                        `<div class="fixed-action-btn" id="save">
                                    <a class="btn-floating btn-large pulse green">
                                        <i class="large material-icons">favorite</i>
                                    </a>
                                </div>`;

                    tombol.innerHTML = tombolSaveHtml;

                    saveItem();
                }
            }
        }

        function deleteItem() {
            document.getElementById("delete").addEventListener("click", () => {
                let id = document.getElementById('delete').getAttribute("data-id");
                notifDelFavTeam(teamName);
                deleteFavoriteTeam(parseInt(id))
                getFavoriteTeams().then(items => {
                    cekFavoriteTeam(items)
                })
            })
        }

        function saveItem() {
            document.getElementById("save").addEventListener("click", () => {
                notifAddFavTeam(teamName);
                saveFavoriteTeam(data)
                getFavoriteTeams().then(items => {
                    cekFavoriteTeam(items)
                })
            })
        }
    }


}