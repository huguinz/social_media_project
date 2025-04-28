'use strict'

const homeIcon = document.getElementById('home_icon')
const deleteUserIcon = document.getElementById('delete_user')

const allDataUserAccount = async () => {
	const idUser = localStorage.getItem('idUser')
	const numberOfUserPublications = []
	const data = await getUserById(idUser)
	const containerHeader = document.getElementById('container_header')
	const profileImage = document.getElementById('profile_image')
	const containerData = document.createElement('div')
	const loopLogo = document.getElementById('loop_logo')
	const publicationData = await getAllPublications()
	const userNameContainer = document.getElementById('username')
	const userName = document.createElement('h1')

	publicationData.forEach((publications) => {
		if (publications.idUsuario === idUser) {
			numberOfUserPublications.push(publications.idUsuario)
		}
	})

	profileImage.src = data.imagemPerfil
	containerData.id = 'container_data'
	containerData.innerHTML = `
								<div class="container_info">
                    				<p>${numberOfUserPublications.length}</p>
                    				<p>Publications</p>
                				</div>
								<div class="container_info">
                    				<p>0</p>
                    				<p>Friends</p>
                				</div>
                				<div class="container_info">
                    				<p>0</p>
                    				<p>Followers</p>
                				</div>
                				<div class="container_info">
                    				<p>0</p>
                    				<p>Following</p>
                				</div>
							`
	userName.textContent = data.nome

	userNameContainer.appendChild(userName)
	containerHeader.insertBefore(containerData, loopLogo)
}

const getUserById = async (id) => {
	const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`
	const response = await fetch(url)

	const data = await response.json()

	return data
}

const getAllPublications = async () => {
	const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
	const response = await fetch(url)

	if (response.status === 200) {
		const data = response.json()
		return data
	} else {
		return false
	}
}

const deleteUser = async (id) => {
	const url = `https://back-spider.vercel.app/user/deleteUser/${id}`
	const options = {
		method: 'DELETE'
	}

	const response = await fetch(url, options)
	console.log(response)

	if (response.status === 204) {
		return response
	} else {
		return false
	}
}

allDataUserAccount()

deleteUserIcon.addEventListener('click', async () => {
	const userConfirm = confirm('Are you sure you want to delete your account? This action cannot be undone!')
	const idUser = localStorage.getItem('idUser')
	if (userConfirm) {
		const response = await deleteUser(idUser)

		if (response) {
			alert('account deleted successfully!')
			localStorage.removeItem('idUser')
			location.href = '/index.html'
		} else {
			alert('Unable to delete the account!')
		}
	}
})

if (!localStorage.getItem('idUser')) {
	alert('ERROR: Please log in or create an account before entering!')
	window.location.href = '/index.html'
}

homeIcon.addEventListener('mouseover', () => {
	homeIcon.src = '/src/img/home_filled.png'
})
homeIcon.addEventListener('mouseleave', () => {
	homeIcon.src = '/src/img/home_outlined.png'
})
homeIcon.addEventListener('click', () => {
	location.href = '/src/pages/homePage.html'
})
