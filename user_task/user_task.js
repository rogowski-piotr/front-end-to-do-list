import {
    getParameterByName,
    clearElementChildren,
    createLinkCell,
    createButtonCell,
    createTextCell,
    setTextNode
} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    fetchAndDisplayUser();
    fetchAndDisplayTasks();
    addAddLink();
});

/**
 * Fetches user and modifies the DOM tree in order to display them.
 */
function fetchAndDisplayTasks() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayTasks(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/users/' + getParameterByName('user') + '/tasks', true);
    xhttp.send();
}

/**
 * Updates the DOM tree in order to display tasks.
 *
 * @param {{tasks: {id: number, name:string}[]}} tasks
 */
function displayTasks(tasks) {
    let tableBody = document.getElementById('tableBody');
    clearElementChildren(tableBody);
    tasks.tasks.forEach(task => {
        tableBody.appendChild(createTableRow(task));
    })
}

/**
 * Creates single table row for entity.
 *
 * @param {{id: number, name: string}} task
 * @returns {HTMLTableRowElement}
 */
function createTableRow(task) {
    let tr = document.createElement('tr');
    tr.appendChild(createTextCell(task.description));
    tr.appendChild(createLinkCell('view', '../task_view/task_view.html?user=' + getParameterByName('user') + '&task=' + task.id));
    tr.appendChild(createLinkCell('edit', '../task_edit/task_edit.html?user=' + getParameterByName('user') + '&task=' + task.id));
    tr.appendChild(createButtonCell('delete', () => deleteTask(task.id)));
    return tr;
}

/**
 * Deletes entity from backend and reloads table.
 *
 * @param {number} task to be deleted
 */
function deleteTask(task) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 202) {
            fetchAndDisplayTasks();
        }
    };
    xhttp.open("DELETE", getBackendUrl() + '/api/users/' + getParameterByName('user')
        + '/tasks/' + task, true);
    xhttp.send();
}


/**
 * Fetches single user and modifies the DOM tree in order to display it.
 */
function fetchAndDisplayUser() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayUser(JSON.parse(this.responseText))
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
}

function addAddLink() {
    document.getElementById("addLink").href = '../task_add/task_add.html?user=' + getParameterByName('user');
}
