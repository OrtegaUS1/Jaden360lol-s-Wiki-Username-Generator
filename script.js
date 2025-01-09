let usernames = [];

const fetchUserData = async (username) => {
    const apiUrl = `https://community.fandom.com/api/v1/User/Details?ids=${username}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;
    const response = await fetch(proxyUrl);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    const data = await response.json();
    return JSON.parse(data.contents).items[0];
};

async function userfind(offset = 0) {
    try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(`https://roblox-slap-battles.fandom.com/api.php?action=listuserssearchuser&format=json&username=&groups=all%2Cauthenticated%2Cbot-global%2Ccontent-reviewer%2Ccontent-volunteer%2Ccouncil%2Cfandom-editor%2Cfandom-star%2Cglobal-discussions-moderator%2Cglobal-edit-reviewer%2Chelper%2Cimagereviewer%2Cnotifications-cms-user%2Crequest-to-be-forgotten-admin%2Crestricted-login%2Crestricted-login-exempt%2Csensitive-tool-access%2Csoap%2Cstaff%2Ctranslator%2Cutil%2Cvanguard%2Cvoldev%2Cwiki-specialist%2Cbot%2Cbureaucrat%2Ccontent-moderator%2Cquick-answers-editor%2Csysop%2Cthreadmoderator&contributed=10&limit=100&order=ts_edit&sort=desc&offset=${offset}`));

        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);

        const data = await response.json();
        const jsonData = JSON.parse(data.contents); // AllOrigins wraps the response in a "contents" property

        const fetchedUsernames = Object.values(jsonData.listuserssearchuser).map(user => user.username);
        usernames = usernames.concat(fetchedUsernames);

        if (fetchedUsernames.length === 101) {
            setTimeout(() => userfind(offset + 100), 1000); // Increment offset and fetch next batch
        } else {
            
        }
    } catch (error) {
        console.error('Error fetching user list:', error);
        document.getElementById("output").innerText = 'Error fetching user list: ' + error.message;
    }
}

function find() {
    if (usernames.length === 0) {
        document.getElementById("output").innerText = 'No usernames stored. Please run userfind() first.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * usernames.length);
    const selectedUsername = usernames[randomIndex];
    const userLink = `https://roblox-slap-battles.fandom.com/wiki/User:${selectedUsername}`;
    document.getElementById("output").innerHTML = `<a href="${userLink}" target="_blank">${selectedUsername}</a>`;
    fetchProfilePicture(selectedUsername);
    displayImage()
    Rank()
}

const fetchProfilePicture = async (username) => {
    try {
        const user = await fetchUserData(username);
        if (user && user.avatar) {
            const imgUrl = user.avatar;
            displayImage(imgUrl);
        } else {
            document.getElementById("profile-picture").innerText = 'Profile picture not found.';
        }
    } catch (error) {
        document.getElementById("profile-picture").innerText = `Error fetching profile picture: ${error.message}`;
    }
};

const displayImage = (imgUrl) => {
    const img = new Image();
    img.src = imgUrl;
    img.alt = "Loading...";
    document.getElementById("profile-picture").innerHTML = '';
    document.getElementById("profile-picture").appendChild(img);
};

userfind();
setTimeout(() => find(), 5000); // Wait for 5 seconds to ensure data is fetched before calling find
function Rank(){
let username = document.getElementById("output").innerText;
let rank = "unranked"
if (username === "Jaden360lol" || username === "Altforislandstrading") {
 rank = "Creator 👑"; 
 }
 if (username === "Rebeltech" || username === "MoodyDrummers" || username === "Witrine" || username === "Jijo Pijo Fijo" || username === "SuperiorShyguy" || username === "Player 111 battel dudes" || username === "" || username === "" || username === "" ) {
    rank = "Special 😎"; 
    }   
    if (username === "XavierlikesGames" || username === "FennGaming264" || username === "MaxTheGuy" || username === "Lomainit35" || username === "Marigoldz1000" || username === "AmkGammer"  || username === "" || username === "") {
        rank = "Normal 👍"; 
        }
        if (username === "Bdog7210" || username === "") {
            rank = "uncool 😠"; 
            } 














 document.getElementById("Rank").innerText = "Rank: " + rank
}
