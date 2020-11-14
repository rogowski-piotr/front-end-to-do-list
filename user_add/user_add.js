import {getBackendUrl} from '../js/configuration.js';

window.addEventListener('load', () => {
    const infoForm = document.getElementById('infoForm');
    infoForm.addEventListener('submit', event => addAction(event));
});

/**
 * Action event handled for adding new user.
 * @param {Event} event dom event
 */
function addAction(event) {
    event.preventDefault();

    const xhttp = new XMLHttpRequest();

    xhttp.open("POST", getBackendUrl() + '/api/users', true);

    const request = {
        'firstName': document.getElementById('firstName').value,
        'lastName': document.getElementById('lastName').value,
        'birthDate': document.getElementById('birthDate').value,
        'email': document.getElementById('email').value,
        'password': document.getElementById('password').value,
    };

    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(request));
}
