import {
    getParameterByName,
    setTextNode,
    createImageCell
} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    fetchAndDisplayUser();
    addEditButton();
    fetchAndDisplayAvatar();
});


/**
 * Fetches and display avatar of user
 */
function fetchAndDisplayAvatar() {
    const img = document.getElementById("avatar");
    const url = getBackendUrl() + '/api/users/' + getParameterByName('user') + "/portrait";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function(oEvent) {
        let blob = new Blob([oEvent.target.response], {type: "image/png"});
        img.src = URL.createObjectURL(blob);
    };
    xhr.send();
}

/**
 * Fetches single user and modifies the DOM tree in order to display it.
 */
function fetchAndDisplayUser() {
    createImageCell
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayUser(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/users/' + getParameterByName('user'), true);
    xhttp.send();
}

/**
 * Updates the DOM tree in order to display user.
 *
 * @param {email: string, firstName: string, lastName: string, birthDate: string} user
 */
function displayUser(user) {
    setTextNode('username', user.firstName + " " + user.lastName);
    setTextNode('email', user.email);
    setTextNode('birthDate', user.birthDate);
}

function addEditButton() {
    document.getElementById("editButton").href = '../user_edit/user_edit.html?user=' + getParameterByName('user');
}
