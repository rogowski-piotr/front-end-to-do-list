import {getParameterByName} from '../js/dom_utils.js';
import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    const infoForm = document.getElementById('infoForm');

    infoForm.addEventListener('submit', event => updateInfoAction(event));
});

/**
 * Action event handled for updating task info.
 * @param {Event} event dom event
 */
function updateInfoAction(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();

    xhttp.open("PUT", getBackendUrl() + '/api/users/' + getParameterByName('user') + '/tasks/' + getParameterByName('task'), true);

    const request = {
        'description': document.getElementById('description').value,
        'extendedDescription': document.getElementById('extendedDescription').value,
        'priority': parseInt(document.getElementById('priority').value)
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.send(JSON.stringify(request));
}
