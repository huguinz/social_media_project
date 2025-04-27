'use strict'

const newPublicationButton = document.getElementById('new_publication')
const signOut = document.getElementById('sign_out')
signOut.addEventListener('click', () => {
	localStorage.removeItem('idUser')
	window.location.href = '/index.html'
})

const getAllPublications = async () => {
	const publications = document.getElementById('publications')
	const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
	const response = await fetch(url)

	if (!localStorage.getItem('idUser')) {
		alert('ERROR: Please log in or create an account before entering!')
		window.location.href = '/index.html'
	}
	if (response.status === 200) {
		const data = await response.json()

		data.forEach(async (item) => {
			const containerImg = document.createElement('div')
			const containerIcons = document.createElement('div')
			const descriptionPublication = document.createElement('div')
			const textContainer = document.createElement('div')
			const nameUser = document.createElement('h2')
			const locationUser = document.createElement('p')
			const descriptionUserPublication = document.createElement('p')
			const images = document.createElement('img')
			const like = document.createElement('img')
			const comment = document.createElement('img')
			const share = document.createElement('img')
			const profileImage = document.createElement('img')
			const locationIcon = document.createElement('img')
			const responseUserById = await getUserById(item.idUsuario)

			containerImg.id = 'container_img'
			containerImg.dataset.idPublication = item.id
			containerIcons.id = 'container_icons'
			descriptionPublication.id = 'description_publication'
			textContainer.id = 'text_container'
			profileImage.src = responseUserById.imagemPerfil
			profileImage.id = 'profile_image'
			nameUser.textContent = responseUserById.nome
			locationIcon.src = '/src/img/location_icon.png'
			locationIcon.id = 'location_icon'
			locationUser.textContent = item.local
			descriptionUserPublication.textContent = item.descricao
			images.src = item.imagem
			images.id = 'images_publications'
			like.src = '/src/img/outline_like.png'
			like.id = 'like'
			comment.src = '/src/img/comment.png'
			comment.id = 'comment'
			share.src = '/src/img/share.png'
			share.id = 'share'

			publications.appendChild(containerImg)
			descriptionPublication.appendChild(profileImage)
			textContainer.appendChild(nameUser)
			textContainer.appendChild(locationIcon)
			textContainer.appendChild(locationUser)
			descriptionPublication.appendChild(textContainer)
			containerImg.appendChild(descriptionPublication)
			containerImg.appendChild(descriptionUserPublication)
			containerImg.appendChild(images)
			containerIcons.appendChild(like)
			containerIcons.appendChild(comment)
			containerIcons.appendChild(share)
			containerImg.appendChild(containerIcons)

			if (item.idUsuario === localStorage.getItem('idUser')) {
				const trashIconContainer = document.createElement('div')
				const trashIcon = document.createElement('img')

				trashIconContainer.id = 'trash_icon_container'
				trashIcon.src = '/src/img/trash.png'

				trashIconContainer.appendChild(trashIcon)
				textContainer.appendChild(trashIconContainer)

				trashIconContainer.addEventListener('click', async () => {
					await deletePublication(item.id)
				})
			}

			if (item.curtidas !== undefined) {
				item.curtidas.forEach((likes) => {
					const isLiked = localStorage.getItem('idUser') == likes.idUsuario

					if (isLiked) {
						like.src = '/src/img/fill_like.png'
						like.classList.add('like_fill')
					}
				})
			}

			like.addEventListener('click', () => {
				const getDataSet = containerImg.dataset.idPublication
				like.src = '/src/img/fill_like.png'
				like.classList.add('like_fill')
				putLikeUser(getDataSet)

				setTimeout(() => {
					like.classList.remove('like_fill')
				}, 200)
			})
		})
	}
}

const putLikeUser = async (id) => {
	const url = `https://back-spider.vercel.app/publicacoes/likePublicacao/${id}`
	const idUser = JSON.parse(localStorage.getItem('idUser'))

	const body = {
		idUser: idUser
	}

	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}
	await fetch(url, options)
}

const getUserById = async (id) => {
	const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`
	const response = await fetch(url)

	const data = await response.json()

	return data
}

const postPublication = async () => {
	const description = document.getElementById('description').value
	const location = document.getElementById('location').value
	const urlImage = document.getElementById('url_image').value
	const idUser = localStorage.getItem('idUser')
	const url = 'https://back-spider.vercel.app/publicacoes/cadastrarPublicacao'

	const body = {
		descricao: description,
		dataPublicacao: currentData(),
		imagem: urlImage,
		local: location,
		idUsuario: idUser
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}

	const response = await fetch(url, options)

	if (response.status === 201) {
		alert('publication added successfully!')
		window.location.reload()
	} else if (response.status === 400) {
		alert('all fields are mandatory!')
	} else {
		alert('an unexpected error occurred while trying to add the publication!')
	}
}

const deletePublication = async (id) => {
	const url = `https://back-spider.vercel.app/publicacoes/deletarPublicacao/${id}`
	const options = {
		method: 'DELETE'
	}

	const response = await fetch(url, options)

	if (response.status === 200) {
		alert('publication deleted successfully!')
	}
}

const currentData = () => {
	const date = new Date()
	const day = date.getDay()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const newDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`

	return newDate
}

const newPublicationData = () => {
	const newPublicationContainer = document.querySelector('article')
	const containerForm = document.getElementById('container_form')
	const inputDescription = document.getElementById('description')
	const charactersNumber = containerForm.querySelector('p')
	const closeTab = document.getElementById('close_tab')
	newPublicationContainer.style.pointerEvents = 'all'
	newPublicationContainer.style.opacity = '1'

	closeTab.addEventListener('click', () => {
		newPublicationContainer.style.pointerEvents = 'none'
		newPublicationContainer.style.opacity = '0'
	})

	inputDescription.addEventListener('input', () => {
		charactersNumber.textContent = inputDescription.value.length

		if (inputDescription.value.length >= 80) {
			charactersNumber.style.color = 'red'
			inputDescription.style.borderBottomColor = '#df3636'
		} else {
			charactersNumber.style.color = 'black'
			inputDescription.style.borderBottomColor = 'black'
		}
	})
}

newPublicationButton.addEventListener('click', newPublicationData)

getAllPublications()
