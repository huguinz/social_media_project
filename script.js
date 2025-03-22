'use strict'

const signUpInput = document.getElementById('btn-submit')
const iconPasswordVisibility = document.getElementById('password_visibility')
const iconConfirmPasswordVisibility = document.getElementById('passwordC_visibility')

const validateEmptyFields = () => {
	const email = document.getElementById('email').value
	const username = document.getElementById('username').value
	const password = document.getElementById('password').value
	const confirm_password = document.getElementById('passwordC').value

	if (email === '' || username === '' || password === '' || confirm_password === '') {
		document.getElementById('error_register_message').innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
	} else {
		window.location.href('s.html')
	}
}

const passwordVisibility = () => {
	const inputPassword = document.getElementById('password')

	if (inputPassword.type == 'password') {
		inputPassword.type = 'text'
		iconPasswordVisibility.src = './img/visible.png'
	} else {
		inputPassword.type = 'password'
		iconPasswordVisibility.src = './img/invisible.png'
	}
}

const passwordConfirmVisibility = () => {
	const inputConfirmPassword = document.getElementById('passwordC')

	if (inputConfirmPassword.type == 'password') {
		inputConfirmPassword.type = 'text'
		iconConfirmPasswordVisibility.src = './img/visible.png'
	} else {
		inputConfirmPassword.type = 'password'
		iconConfirmPasswordVisibility.src = './img/invisible.png'
	}
}

signUpInput.addEventListener('click', validateEmptyFields)
iconPasswordVisibility.addEventListener('click', passwordVisibility)
iconConfirmPasswordVisibility.addEventListener('click', passwordConfirmVisibility)
