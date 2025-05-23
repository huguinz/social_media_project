'use strict'

const signUpInput = document.getElementById('btn-submit')
const iconPasswordVisibility = document.getElementById('password_visibility')
const iconConfirmPasswordVisibility = document.getElementById('passwordC_visibility')

const postRegisterUser = async (event) => {
	event.preventDefault()

	const email = document.getElementById('email').value
	const nome = document.getElementById('username').value
	const senha = document.getElementById('password').value
	const confirm_password = document.getElementById('passwordC').value
	const recovery_password = document.getElementById('recovery_password').value
	const premium = document.getElementById('premium-sub').checked ? '1' : '0'

	const errorMessage = document.getElementById('error_register_message')
	errorMessage.innerHTML = ''

	if (email === '' || nome === '' || senha === '' || confirm_password === '' || recovery_password === '') {
		errorMessage.innerHTML = '<p> * It is mandatory to fill in all fields! </p>'
		return
	}

	if (senha !== confirm_password) {
		errorMessage.innerHTML = '<p> * Passwords do not match! </p>'
		return
	}

	if (senha.length < 8) {
		errorMessage.innerHTML = '<p> * The password must have at least 8 characters! </p>'
		return
	}

	const body = {
		nome: nome,
		email: email,
		senha: senha,
		premium: premium,
		imagemPerfil:
			'https://img.freepik.com/vetores-gratis/vetor-alienigena-usando-chapeu-de-balde_43623-972.jpg?t=st=1745707141~exp=1745710741~hmac=2499ffa357b7103176691d90be52cecf199b873078ca26574ba57fd2631944f0&w=740',
		senhaRecuperacao: recovery_password
	}

	const response = await fetch('https://back-spider.vercel.app/user/cadastrarUser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})

	if (response.ok) {
		alert('user registered successfully!!')
		window.location.href = '/index.html'
	} else if (response.status == 404) {
		alert('this email already exists!!')
	} else {
		alert('register error!!')
	}
}

signUpInput.addEventListener('click', postRegisterUser)

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

const passwordConfirmVisibility = () => {
	const inputConfirmPassword = document.getElementById('passwordC')

	if (inputConfirmPassword.type == 'password') {
		inputConfirmPassword.type = 'text'
		iconConfirmPasswordVisibility.src = '/src/img/visible.png'
	} else {
		inputConfirmPassword.type = 'password'
		iconConfirmPasswordVisibility.src = '/src/img/invisible.png'
	}
}

iconPasswordVisibility.addEventListener('click', passwordVisibility)
iconConfirmPasswordVisibility.addEventListener('click', passwordConfirmVisibility)
