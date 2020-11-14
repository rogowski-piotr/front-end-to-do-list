import {clearElementChildren, createLinkCell, createButtonCell, createTextCell} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    fetchAndDisplayUsers();
});

/**
 * Fetches all users and modifies the DOM tree in order to display them.
 */
function fetchAndDisplayUsers() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayUsers(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/users', true);
    xhttp.send();
}

/**
 * Updates the DOM tree in order to display users.
 *
 * @param {{users: string[]}} users
 */
function displayUsers(users) {
    let tableBody = document.getElementById('tableBody');
    clearElementChildren(tableBody);
    users.users.forEach(name => {
        tableBody.appendChild(createTableRow(name));
    })
}

/**
 * Creates single table row for entity.
 *
 * @param {string} user
 * @returns {HTMLTableRowElement}
 */
function createTableRow(user) {
    let tr = document.createElement('tr');
    tr.appendChild(createTextCell(user.firstName + " " + user.lastName));
    tr.appendChild(createLinkCell('view', '../user_view/user_view.html?user=' + user.email));
    tr.appendChild(createLinkCell('tasks', '../user_task/user_task.html?user=' + user.email));
    tr.appendChild(createButtonCell('delete', () => deleteUser(user.email)));
    return tr;
}

/**
 * Deletes entity from backend and reloads table.
 *
 * @param {string } user to be deleted
 */
function deleteUser(user) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 202) {
            fetchAndDisplayUsers();
        }
    };
    xhttp.open("DELETE", getBackendUrl() + '/api/users/' + user, true);
    xhttp.send();
}
