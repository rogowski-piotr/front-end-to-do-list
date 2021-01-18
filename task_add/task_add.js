import {getParameterByName} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    const infoForm = document.getElementById('infoForm');

    infoForm.addEventListener('submit', event => addAction(event));
});

/**
 * Action event handled for adding new task.
 * @param {Event} event dom event
 */
function addAction(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", getBackendUrl() + '/api/users/' + getParameterByName('user') + '/tasks', true);

    const request = {
        'description': document.getElementById('description').value,
        'extendedDescription': document.getElementById('extendedDescription').value,
        'priority': parseInt(document.getElementById('priority').value),
        'startDate': document.getElementById('startDate').value,
        'plannedEndDate': document.getElementById('plannedEndDate').value
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(request));
}
