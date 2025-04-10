'use strict'

const validatePassword = document.getElementById('btn-submit')
const errorMessage = document.getElementById('error_register_message')

const postRecoveryUser = async (event) => {
	event.preventDefault()

	const email = document.getElementById('email').value
	const password_key = document.getElementById('password_key').value
	errorMessage.innerHTML = ''
	const url = 'https://back-spider.vercel.app/user/RememberPassword'

	if (email === '' || password_key === '') {
		errorMessage.innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
		return
	}

	const data = {
		email: email,
		wordKey: password_key
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	const response = await fetch(url, options)

	if (response.status == 200) {
		alert('Now change a new password!')
		const divEmail = document.getElementById('input_email')
		const divPassword = document.getElementById('input_password')
		const submitButton = document.getElementById('submit_button')

		divEmail.innerHTML = ` 
								<img src="/src/img/padlock.png" alt="lock_icon" class="icons">
  								<input type="password" id="input_password" name="input_password" placeholder=" " required>
  								<label for="input_password">New password</label>
							`

		divPassword.innerHTML = ` 
								<img src="/src/img/padlock.png" alt="lock_icon" class="icons">
  								<input type="password" id="input_passwordC" name="input_passwordC" placeholder=" " required>
  								<label for="input_passwordC">Confirm password</label>
							`

		submitButton.innerHTML = ` 
								    <a href="/index.html" id="btn-back" style="color: black;">Back Login</a>
									<button id="submit-new-password">
										Enter
									</button>
							`
		const setPassword = document.getElementById('submit-new-password')
		setPassword.addEventListener('click', createSetPasswordFields)
		console.log(await response.json())
	} else {
		errorMessage.innerHTML = '<p> * Invalid e-mail or password key! </p>'
		console.log(response)
	}
}

validatePassword.addEventListener('click', postRecoveryUser)

const createSetPasswordFields = async (event) => {
	event.preventDefault()

	const inputPassword = document.getElementById('input_password').value
	const inputConfirmPassword = document.getElementById('input_passwordC').value

	if (inputPassword === '' || inputConfirmPassword === '') {
		errorMessage.innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
		return
	} else if (inputPassword.length < 8) {
		errorMessage.innerHTML = '<p> * The password must have at least 8 characters! </p>'
		return
	} else if (inputPassword !== inputConfirmPassword) {
		errorMessage.innerHTML = '<p> * Passwords do not match! </p>'
		return
	} else {
		return
	}
}

const setNewPassword = async (id) => {}
