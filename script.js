let usernames = [];

async function userfind() {
    try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://roblox-slap-battles.fandom.com/api.php?action=listuserssearchuser&format=json&username=&groups=all%2Cauthenticated%2Cbot-global%2Ccontent-reviewer%2Ccontent-volunteer%2Ccouncil%2Cfandom-editor%2Cfandom-star%2Cglobal-discussions-moderator%2Cglobal-edit-reviewer%2Chelper%2Cimagereviewer%2Cnotifications-cms-user%2Crequest-to-be-forgotten-admin%2Crestricted-login%2Crestricted-login-exempt%2Csensitive-tool-access%2Csoap%2Cstaff%2Ctranslator%2Cutil%2Cvanguard%2Cvoldev%2Cwiki-specialist%2Cbot%2Cbureaucrat%2Ccontent-moderator%2Cquick-answers-editor%2Csysop%2Cthreadmoderator&contributed=5&limit=999&order=ts_edit&sort=desc&offset=0"));

        console.log('Response status:', response.status);
        console.log('Response OK:', response.ok);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const jsonData = JSON.parse(data.contents); // AllOrigins wraps the response in a "contents" property

        console.log('Fetched data:', jsonData);

        usernames = Object.values(jsonData.listuserssearchuser).map(user => user.username);
        console.log('Usernames have been fetched and stored:', usernames);
      
    } catch (error) {
        console.error('Error fetching user list:', error);
        document.getElementById("output").innerText = 'Error fetching user list: ' + error.message;
    }
}

function find() {
    if (usernames.length === 0) {
        console.log('No usernames stored. Please run userfind() first.');
        
        return;
    }
    const randomIndex = Math.floor(Math.random() * usernames.length);
    const selectedUsername = usernames[randomIndex];
    console.log('Randomly selected username:', selectedUsername);
    document.getElementById("output").innerText = selectedUsername;
}

setTimeout(() => find(), 3000); // Wait for 3 seconds to ensure data is fetched before calling find
userfind();
