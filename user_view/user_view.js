import {
    getParameterByName,
    setTextNode
} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    fetchAndDisplayUser();
    addEditButton();
});

/**
 * Fetches single user and modifies the DOM tree in order to display it.
 */
function fetchAndDisplayUser() {
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
