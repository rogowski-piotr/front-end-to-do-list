import {getBackendUrl} from '../js/configuration.js';
import {getParameterByName} from "../js/dom_utils.js";

window.addEventListener('load', () => {
    const infoForm = document.getElementById('infoForm');
    infoForm.addEventListener('submit', event => updateInfoAction(event));
});

/**
 * Action event handled for updating user info.
 * @param {Event} event dom event
 */
function updateInfoAction(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();

    xhttp.open("PUT", getBackendUrl() + '/api/users/' + getParameterByName('user'), true);

    const request = {
        'firstName': document.getElementById('firstName').value,
        'lastName': document.getElementById('lastName').value,
        'birthDate': document.getElementById('birthDate').value,
        'email': getParameterByName('user'),
        'password': document.getElementById('password').value,
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(request));
}
