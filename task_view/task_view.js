import {
    getParameterByName,
    setTextNode
} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    fetchAndDisplayTask();
    addBackLink();
});

function fetchAndDisplayTask() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            displayTask(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", getBackendUrl() + '/api/users/' + getParameterByName('user') + '/tasks/' + getParameterByName('task'), true);
    xhttp.send();
}

function displayTask(task) {
    setTextNode('description', task.description);
    setTextNode('extendedDescription', task.extendedDescription);
    setTextNode('priority', task.priority);
    setTextNode('startDate', task.startDate);
    setTextNode('plannedEndDate', task.plannedEndDate);
    setTextNode('username', task.owner.firstName + " " + task.owner.lastName);
    setTextNode('email', task.owner.email);
}

function addBackLink() {
    document.getElementById("backButton").href = '../user_task/user_task.html?user=' + getParameterByName('user');
}