'use strict'

const getAllPublications = async () => {
	const publications = document.getElementById('publications')
	const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
	const response = await fetch(url)

	if (response.status === 200) {
		const data = await response.json()

		data.forEach((item) => {
			const container_img = document.createElement('div')
			const container_icons = document.createElement('div')
			const images = document.createElement('img')
			const like = document.createElement('img')
			const comment = document.createElement('img')
			const share = document.createElement('img')

			container_img.id = 'container_img'
			container_icons.dataset.idPublication = item.id
			container_icons.id = 'container_icons'
			images.src = item.imagem
			images.id = 'images_publications'
			like.src = '/src/img/outline_like.png'
			like.id = 'like'
			comment.src = '/src/img/comment.png'
			comment.id = 'comment'
			share.src = '/src/img/share.png'
			share.id = 'share'

			publications.appendChild(container_img)
			container_img.appendChild(images)
			container_icons.appendChild(like)
			container_icons.appendChild(comment)
			container_icons.appendChild(share)
			container_img.appendChild(container_icons)

			like.addEventListener('click', () => {
				const getDataSet = container_icons.dataset.idPublication
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

getAllPublications()
