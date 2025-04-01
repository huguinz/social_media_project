'use strict'

const loginImput = document.getElementById('btn-submit')

const postRecoveryUser = async (event) => {
	event.preventDefault()

	const email = document.getElementById('email').value
	const password_key = document.getElementById('password_key').value
	const errorMessage = document.getElementById('error_register_message')
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
		alert('successfully!')
		console.log(response)
		window.location.href = '#'
	} else {
		errorMessage.innerHTML = '<p> * Invalid e-mail or password key! </p>'
		console.log(response)
	}
}

loginImput.addEventListener('click', postRecoveryUser)
