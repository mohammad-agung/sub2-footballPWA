function setPlayer(data) {
    let playerHTML = `
    <div class="col s12 m6">
        <div class="pages-title center">
            <h3>Profile Player</h3>
        </div>
        <div class="card">
            <div class="card-content">
                <div class="col s12 center">
                    <div class="cycle">`;
    if (data.shirtNumber === null) {
        playerHTML += `<span class="number">N/A</span>`;
    } else {
        playerHTML += `<span class="number">${data.shirtNumber}</span>`;
    }
    playerHTML += `     </div>
                </div>
                <div class="row">
                    <div class="col s5">Fullname</div>
                    <div class="col s7">: ${data.name}</div>
                </div>
                <div class="row">
                    <div class="col s5">Position</div>
                    <div class="col s7">: `
    if (data.position === "Goalkeeper") {
        playerHTML += 'GK';
    } else if (data.position === "Defender") {
        playerHTML += 'DF';
    } else if (data.position === "Midfielder") {
        playerHTML += "MF";
    } else if (data.position === "Attacker") {
        playerHTML += "CF";
    }
    playerHTML += `     </div>
                </div>
                <div class="row">
                    <div class="col s5">Date of Birth</div>
                    <div class="col s7">: ${data.dateOfBirth}</div>
                </div>
                <div class="row">
                    <div class="col s5">Place of Birth</div>
                    <div class="col s7">: ${data.countryOfBirth}</div>
                </div>
                <div class="row">
                    <div class="col s5">Nationality</div>
                    <div class="col s7">: ${data.nationality}</div>
                </div>
            </div>
        </div>
    </div>`;

    document.getElementById("profile_player").innerHTML = playerHTML;
}