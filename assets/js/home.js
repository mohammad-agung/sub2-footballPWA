function setStandings(data) {
    let standingsHtml = `
        <table>
            <thead>
                <tr>
                    <th class="custom-th">Pos</th>
                    <th>Club</th>
                    <th>PL</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>Pts</th>
                </tr>
            </thead>
        <tbody>`;
    data.standings[0].table.forEach(function (data) {
        standingsHtml += `
            <tr>
                <td class="custom-td">${data.position}</td>
                <td><a href="/profile-club.html?id=${data.team.id}">${data.team.name}</a>
                </td>
                <td>${data.playedGames}</td>
                <td>${data.won}</td>
                <td>${data.draw}</td>
                <td>${data.lost}</td>
                <td>${data.points}</td>
            </tr>`;
    });

    standingsHtml += '</tbody>';
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("table-standings").innerHTML = standingsHtml;
    saveStandings(data);
}

function setScorer(data) {
    let scorerHeader =
        `<div class="pages-title center">
            <h3>Top Scorers</h3>
        </div>`;
    let scorerHtml = `
        <table>
            <thead>
                <tr>
                    <th class="custom-th">Pos</th>
                    <th>Name Player</th>
                    <th>Club</th>
                    <th>Goals</th>
                </tr>
            </thead>
        <tbody>`;
    let number = 1;
    data.scorers.forEach(function (data) {
        scorerHtml +=
            `<tr>
                <td class="custom-td">${number++}</td>
                <td><a href="/profile-player.html?id=${data.player.id}">${data.player.name}</a></td>
                <td><a href="/profile-club.html?id=${data.team.id}">${data.team.name}</a>
                </td>
                <td>${data.numberOfGoals}</td>
            </tr>`;
    });

    scorerHtml += '</tbody>';
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("scorer-header").innerHTML = scorerHeader;
    document.getElementById("table-scorer").innerHTML = scorerHtml;
}