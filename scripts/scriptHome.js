'use strict'

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
			const container_img = document.createElement('div')
			const container_icons = document.createElement('div')
			const description_publication = document.createElement('div')
			const images = document.createElement('img')
			const like = document.createElement('img')
			const comment = document.createElement('img')
			const share = document.createElement('img')
			const profile_image = document.createElement('img')

			const userData = await fetch(`https://back-spider.vercel.app/user/pesquisarUser/${item.idUsuario}`)

			const user = await userData.json()

			console.log(user)

			container_img.id = 'container_img'
			container_img.dataset.idPublication = item.id
			container_img.dataset.idUsuario = item.idUsuario
			container_icons.id = 'container_icons'
			description_publication.id = 'description_publication'
			profile_image.src = user.imagemPerfil
			profile_image.id = 'profile_image'
			images.src = item.imagem
			images.id = 'images_publications'
			like.src = '/src/img/outline_like.png'
			like.id = 'like'
			comment.src = '/src/img/comment.png'
			comment.id = 'comment'
			share.src = '/src/img/share.png'
			share.id = 'share'

			publications.appendChild(container_img)
			description_publication.appendChild(profile_image)
			container_img.appendChild(description_publication)
			container_img.appendChild(images)
			container_icons.appendChild(like)
			container_icons.appendChild(comment)
			container_icons.appendChild(share)
			container_img.appendChild(container_icons)

			if (item.curtidas !== undefined) {
				item.curtidas.forEach((likes) => {
					const isLiked = localStorage.getItem('idUser') == likes.idUsuario
					const idUsuario = container_img.dataset.idUsuario

					if (isLiked) {
						like.src = '/src/img/fill_like.png'
						like.classList.add('like_fill')
					}
					getUserById(idUsuario).then((userInfo) => {
						console.log(idUsuario)

						// if (container_icons.dataset.idPublication == userInfo.id) {

						// 	const nameUser = document.createElement('h2')
						// 	nameUser.textContent = userInfo.nome

						// 	description_publication.appendChild(nameUser)
						// }
					})
				})
			}

			like.addEventListener('click', () => {
				const getDataSet = container_img.dataset.idPublication
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

getAllPublications()
