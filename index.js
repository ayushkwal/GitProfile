console.log('hello');
let fetchBtn = document.getElementById('searchUser');
fetchBtn.addEventListener('keyup', buttonClickHandler)

function buttonClickHandler(e) {
    let username = e.target.value;

    //For Repos
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${username}/repos`, true);
    xhr.onprogress = function() {
        console.log('Searching among 40 million users');
    }
    let bodyHtml = document.getElementById('detailHtml');
    xhr.onload = function() {
        if (this.status === 200) {
            // console.log(this.responseText);
            let obj = JSON.parse(this.responseText);
            let html = "";
            for (key in obj) {
                console.log(obj[key].name, obj[key].description, obj[key].language, obj[key].created_at, obj[key].updated_at, obj[key].forks_count, obj[key].watchers, obj[key].stargazers_count);
                html += `
                        <tr>
                        <th scope="row">${obj[key].name}</th>
                        <td>${obj[key].description}</td>
                        <td>${obj[key].fork}</td>
                        <td>${obj[key].language}</td>
                        <td>${obj[key].created_at}</td>
                        <td>${obj[key].updated_at}</td>
                        <td>${obj[key].forks_count}</td>
                        <td>${obj[key].watchers}</td>
                        <td>${obj[key].stargazers_count}</td>
                    </tr>
                        `
            }
            bodyHtml.innerHTML = html;
        } else {
            console.log("No User Found")
        }
    }
    xhr.send();


    //for users
    const xhr2 = new XMLHttpRequest();
    xhr2.open('GET', `https://api.github.com/users/${username}`, true);
    xhr2.onprogress = function() {
        console.log('Searching among 40 million users');
        const searching = document.getElementById('detail');
        searching.innerText = `Searching Among 40 Million Users`;

    }

    xhr2.onload = function() {
        if (this.status === 200) {
            console.log(this.responseText);
            let obj2 = JSON.parse(this.responseText);
            const data = document.getElementById('proRight');

            // Bio:<br> Joined At:<br> Last Visited:<br>Address:<br>Twitter Handle:<br>Company:
            let proHtml =
                `Bio:  ${obj2.bio}<br> Joined At:  ${obj2.created_at}<br> Last Visited:  ${obj2.updated_at}<br>Address:  ${obj2.location}<br>Twitter Handle:  ${obj2.twitter_username}<br>Company:  ${obj2.company}`;
            data.innerHTML = proHtml;

            let lidata = document.getElementById('detail');
            let liHtml = `
            <ul>
            <li>Followers:  ${obj2.followers} </li>
            <li>Following:   ${obj2.following} </li>
            <li>Repositories:   ${obj2.public_repos} </li>
        </ul> 
            `;

            lidata.innerHTML = liHtml;


            let proImage = document.getElementById('pro');
            proImage.innerHTML = `<img src = "${obj2.avatar_url}">`

            let name = document.getElementById('name');
            name.innerText = `${obj2.name}
            Git Handle:  ${obj2.login}`;


        } else {
            console.log("No User Found")
        }
    }
    xhr2.send();
}

let printme = document.getElementById('print');
printme.addEventListener("click", function() {
    printme.style.display = "none";
    fetchBtn.style.display = "none";
    print();

});