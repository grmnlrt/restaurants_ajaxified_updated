// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

Rails.start()
Turbolinks.start()
ActiveStorage.start()


// ----------------------------------------------------
// Note(lewagon): ABOVE IS RAILS DEFAULT CONFIGURATION
// WRITE YOUR OWN JS STARTING FROM HERE 👇
// ----------------------------------------------------

// External imports
import "bootstrap";
import { csrfToken } from "@rails/ujs";

// Internal imports, e.g:
// import { initSelect2 } from '../components/init_select2';

document.addEventListener('turbolinks:load', () => {
  // Call your functions here, e.g:
  const form = document.querySelector('#new_review');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const request_params = {
        method: 'POST',
        headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
        body: new FormData(form)
      }
      fetch(form.action, request_params)
        .then(response => response.json())
        .then(data => {
          const reviews = document.querySelector('#reviews');
          reviews.insertAdjacentHTML('beforeend', data.review);
          form.outerHTML = data.form;
        });
    })
  }
});
