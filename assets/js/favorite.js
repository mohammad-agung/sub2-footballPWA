function getSavedTeams() {
    let number = 1;
    let savedTeamHTML = ""
    getFavoriteTeams().then(function (data) {
        if (data.length == 0) {
            savedTeamHTML +=
                ` <div class="col s12">
                    <div class="card">
                        <div class="card-content center">
                            <h4>Favorite team has not been added</h4>
                        </div>
                    </div>
                </div>`
        } else {
            savedTeamHTML += `
                <div class="col s12">
                    <div class="pages-title center">
                        <h3>Teams Favorit</h3>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <div class="row head">
                                <div class="col s2">No</div>
                                <div class="col s10">Club</div>
                            </div>`;
            data.forEach(function (data) {
                savedTeamHTML += `
                    <div class="row" style="display: flex;align-items: center;">
                        <div class="col s2">${number++}</div>
                        <div class="col s10"><a href="/profile-club.html?id=${data.id}"  style="display: flex;align-items: center;"><img src="${data.crestUrl}" class="logo-thumbnail">${data.name}</a></div>
                    </div>`;
            })
            savedTeamHTML +=
                `  </div>
                </div>
            </div>`;
            // Sisipkan komponen card ke dalam elemen dengan id #body-content
        }

        document.getElementById("saved_teams").innerHTML = savedTeamHTML;
    });
}