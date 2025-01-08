let usernames = [];

async function userfind(offset = 0) {
    try {
        const response = await fetch("https://api.allorigins.win/get?url=" + encodeURIComponent(`https://roblox-slap-battles.fandom.com/api.php?action=listuserssearchuser&format=json&username=&groups=all%2Cauthenticated%2Cbot-global%2Ccontent-reviewer%2Ccontent-volunteer%2Ccouncil%2Cfandom-editor%2Cfandom-star%2Cglobal-discussions-moderator%2Cglobal-edit-reviewer%2Chelper%2Cimagereviewer%2Cnotifications-cms-user%2Crequest-to-be-forgotten-admin%2Crestricted-login%2Crestricted-login-exempt%2Csensitive-tool-access%2Csoap%2Cstaff%2Ctranslator%2Cutil%2Cvanguard%2Cvoldev%2Cwiki-specialist%2Cbot%2Cbureaucrat%2Ccontent-moderator%2Cquick-answers-editor%2Csysop%2Cthreadmoderator&contributed=10&limit=100&order=ts_edit&sort=desc&offset=${offset}`));

        console.log('Response status:', response.status);
        console.log('Response OK:', response.ok);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const jsonData = JSON.parse(data.contents); // AllOrigins wraps the response in a "contents" property

        console.log('Fetched data:', jsonData);

        const fetchedUsernames = Object.values(jsonData.listuserssearchuser).map(user => user.username);
        usernames = usernames.concat(fetchedUsernames);
        console.log('Usernames have been fetched and stored:', usernames);

        // Check if there are more usernames to fetch
        if (fetchedUsernames.length === 101) { // Assuming 100 is the limit per request
            setTimeout(() => userfind(offset + 100), 1000); // Increment offset and fetch next batch
        } else {
            document.getElementById("output").innerText = 'All usernames have been fetched and stored.';
        }
    } catch (error) {
        console.error('Error fetching user list:', error);
        document.getElementById("output").innerText = 'Error fetching user list: ' + error.message;
    }
}

function find() {
    if (usernames.length === 0) {
        console.log('No usernames stored. Please run userfind() first.');
        document.getElementById("output").innerText = 'No usernames stored. Please run userfind() first.';
        return;
    }
    const randomIndex = Math.floor(Math.random() * usernames.length);
    const selectedUsername = usernames[randomIndex];
    console.log('Randomly selected username:', selectedUsername);
    document.getElementById("output").innerText = selectedUsername;
}

userfind();

// Example: Call the find function to get a random username
setTimeout(() => find(), 5000); // Wait for 5 seconds to ensure data is fetched before calling find
