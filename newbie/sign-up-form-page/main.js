const claimButton = document.querySelector('.js-claim-button');

const inputFirstName = document.querySelector('.js-first-name-input');
const inputLastName = document.querySelector('.js-last-name-input');
const inputEmail = document.querySelector('.js-email-input');
const inputPassword = document.querySelector('.js-password-input');

const firstName = document.querySelector('.js-first-name');
const lastName = document.querySelector('.js-last-name');
const email = document.querySelector('.js-email');
const password = document.querySelector('.js-password');

claimButton.addEventListener('click', () => {
  inputValidation();
});

function inputValidation()
{
  for(let i = 0; i < 4; i++)
  {
    if(!inputFirstName.value)
    {
      inputFirstName.classList.add('input-invalid');
      inputFirstName.value = ' ';
      firstName.innerHTML = 'First Name cannot be empty';
    }
    else if(!inputLastName.value)
    {
      inputLastName.classList.add('input-invalid');
      inputLastName.value = ' ';
      lastName.innerHTML = 'Last Name cannot be empty';
    }
    else if(!inputEmail.value)
    {
      inputEmail.classList.add('input-invalid');
      inputEmail.value = 'email@example/com';
      email.innerHTML = 'Looks like this is not an email';
    }
    else if(!inputPassword.value)
    {
      inputPassword.classList.add('input-invalid');
      inputPassword.placeholder = '';
      password.innerHTML = 'Password cannot be empty';
    }
  }
}