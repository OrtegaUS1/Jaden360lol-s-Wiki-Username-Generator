<!DOCTYPE html>
<html>
<head>
    <title>Random Slap Battles User</title>
    <style>
        body { font-family: Arial; color: #fff; background: #111; text-align: center; }
        #profile-picture img { width: 150px; height: 150px; border-radius: 10px; margin-top: 10px; }
    </style>
</head>
<body>

<h1>Random Slap Battles User</h1>

<div id="output">Loading users...</div>
<div id="Rank"></div>
<div id="profile-picture"></div>

<script>
let usernames = [];

const fetchUserData = async (username) => {
    const apiUrl = `https://community.fandom.com/api/v1/User/Details?ids=${username}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error("Failed to fetch user details");
    const data = await response.json();
    return JSON.parse(data.contents).items[0];
};

async function userfind(aucontinue = "") {
    try {
        const apiUrl =
            `https://roblox-slap-battles.fandom.com/api.php?action=query&list=allusers&format=json&aulimit=100`
            + (aucontinue ? `&aucontinue=${aucontinue}` : "");

        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(apiUrl));
        if (!response.ok) throw new Error("Failed to fetch user list");

        const data = await response.json();
        const jsonData = JSON.parse(data.contents);

        const fetchedUsernames = jsonData.query.allusers.map(u => u.name);
        usernames = usernames.concat(fetchedUsernames);

        if (jsonData.continue && jsonData.continue.aucontinue) {
            setTimeout(() => userfind(jsonData.continue.aucontinue), 500);
        } else {
            document.getElementById("output").innerText = "Users loaded! Picking random...";
            setTimeout(() => find(), 1000);
        }

    } catch (error) {
        document.getElementById("output").innerText = "Error: " + error.message;
    }
}

function find() {
    if (usernames.length === 0) {
        document.getElementById("output").innerText = "No usernames loaded.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * usernames.length);
    const selectedUsername = usernames[randomIndex];

    const userLink = `https://roblox-slap-battles.fandom.com/wiki/User:${selectedUsername}`;
    document.getElementById("output").innerHTML =
        `<a href="${userLink}" target="_blank">${selectedUsername}</a>`;

    fetchProfilePicture(selectedUsername);
    Rank(selectedUsername);
}

const fetchProfilePicture = async (username) => {
    try {
        const user = await fetchUserData(username);
        if (user && user.avatar) {
            displayImage(user.avatar);
        } else {
            document.getElementById("profile-picture").innerText = "No profile picture.";
        }
    } catch {
        document.getElementById("profile-picture").innerText = "Error loading avatar.";
    }
};

const displayImage = (imgUrl) => {
    const img = new Image();
    img.src = imgUrl;
    img.alt = "Avatar";
    document.getElementById("profile-picture").innerHTML = "";
    document.getElementById("profile-picture").appendChild(img);
};

function Rank(username) {
    let rank = "unranked";

    if (["Jaden360lol", "Altforislandstrading", "The Gravity Breaker"].includes(username)) {
        rank = "Creator 👑";
    }

    if (["Rebeltech", "MoodyDrummer", "Witrine", "Jijo Pijo Fijo", "SuperiorShyguy",
         "Player 111 battel dudes", "AddictBWN"].includes(username)) {
        rank = "Special 😎";
    }

    if (["XavierlikesGames", "FennGaming264", "MaxTheGuy", "Lomainit35", "Marigoldz1000",
         "AmkGammer", "Dragonfoxkai", "Operationfesh", "ExplodingSkeptic68"].includes(username)) {
        rank = "Normal 👍";
    }

    if (["Bdog7210"].includes(username)) {
        rank = "uncool 😠";
    }

    document.getElementById("Rank").innerText = "Rank: " + rank;
}

userfind();
</script>

</body>
</html>
