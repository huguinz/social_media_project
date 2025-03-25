'use strict'

const loginImput = document.getElementById('btn-submit')
const iconPasswordVisibility = document.getElementById('password_visibility')
const iconConfirmPasswordVisibility = document.getElementById('passwordC_visibility')

const postLoginUser = () => {
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value

	const errorMessage = document.getElementById('error_register_message')
	errorMessage.innerHTML = ''

	if (email === '' || password === '') {
		errorMessage.innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
		return
	}
}

loginImput.addEventListener('click', postLoginUser)

const passwordVisibility = () => {
	const inputPassword = document.getElementById('password')

	if (inputPassword.type == 'password') {
		inputPassword.type = 'text'
		iconPasswordVisibility.src = '/src/img/visible.png'
	} else {
		inputPassword.type = 'password'
		iconPasswordVisibility.src = '/src/img/invisible.png'
	}
}

iconPasswordVisibility.addEventListener('click', passwordVisibility)
