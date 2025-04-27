'use strict'

if (!localStorage.getItem('idUser')) {
	const loginImput = document.getElementById('btn-submit')
	const iconPasswordVisibility = document.getElementById('password_visibility')

	const postLoginUser = async (event) => {
		event.preventDefault()

		const email = document.getElementById('email').value
		const password = document.getElementById('password').value
		const errorMessage = document.getElementById('error_register_message')
		errorMessage.innerHTML = ''
		const url = 'https://back-spider.vercel.app/login'

		if (email === '' || password === '') {
			errorMessage.innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
			return
		}

		const data = {
			email: email,
			senha: password
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
			alert('login successfully!')
			const data = await response.json()

			localStorage.setItem('idUser', JSON.stringify(data.user.id))
			window.location.href = '/src/pages/homePage.html'
		} else {
			errorMessage.innerHTML = '<p> * Invalid e-mail or password! </p>'
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
} else {
	window.location.href = '/src/pages/homePage.html'
}
