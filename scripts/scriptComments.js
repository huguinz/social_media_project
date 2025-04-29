'use strict'

if (!localStorage.getItem('idUser')) {
	alert('ERROR: Please log in or create an account before entering!')
	window.location.href = '/index.html'
} else if (!sessionStorage.getItem('idPublication')) {
	alert('No publications selected!')
	location.href = '/src/pages/homePage.html'
}

const listAllComments = async () => {
	const containerCommentsAllUsers = document.getElementById('container_comments_all_users')
	const containerCommentsAdd = document.getElementById('container_comments_add')
	const idPublication = sessionStorage.getItem('idPublication')
	const idUser = localStorage.getItem('idUser')
	const publicationImageData = document.createElement('aside')
	const defaultCommentMessage = document.createElement('h1')
	const inputComment = document.createElement('input')
	const myComments = document.createElement('section')
	const publicationUser = await getAllPublications()

	defaultCommentMessage.textContent = 'Your comments stay here'
	myComments.appendChild(defaultCommentMessage)

	publicationImageData.id = 'container_publication_data'
	myComments.id = 'my_comments'
	inputComment.type = 'text'
	inputComment.id = 'post_comment'
	inputComment.placeholder = 'Add a comment...'
	inputComment.autocomplete = 'off'
	myComments.appendChild(inputComment)

	publicationUser.forEach((publications) => {
		if (publications.id == idPublication) {
			const numberOfLikes = publications.curtidas.length
			const numberOfComments = publications.comentarios.length
			let isUserComment = false

			publicationImageData.innerHTML = `      
													<img src="${publications.imagem}" alt="publication_image" id="publication_image">
													<div id="container_publication_info">
														<p>${publications.dataPublicacao}</p>
														<p>${numberOfLikes} Likes</p>
														<p>${numberOfComments} Comments</p>
													</div>
												`

			publications.comentarios.forEach(async (comments) => {
				const user = await getUserById(comments.idUsuario)
				const userComment = document.createElement('article')

				userComment.classList.add('user_comment')

				userComment.innerHTML = `
											<img src="${user.imagemPerfil}" alt="user_image" id="user_image">
											<div id="user_info">
												<h1 id="user_name">${user.nome}</h1>
												<p id="user_comment_text">${comments.descricao}</p>
											</div>
										`

				containerCommentsAllUsers.appendChild(userComment)

				if (idUser === comments.idUsuario && !isUserComment) {
					const userInfo = await getUserById(idUser)
					const commentWrapper = document.createElement('article')
					const profileImage = document.createElement('img')
					const containerData = document.createElement('div')
					const userName = document.createElement('h1')
					const userComment = document.createElement('p')

					defaultCommentMessage.replaceChildren('')
					commentWrapper.classList.add('my_single_comment')

					profileImage.src = userInfo.imagemPerfil
					profileImage.alt = 'my_image'
					profileImage.id = 'my_image'

					containerData.id = 'my_info'
					userName.id = 'my_name'
					userName.textContent = userInfo.nome
					userComment.id = 'my_comment'
					userComment.textContent = comments.descricao

					containerData.appendChild(userName)
					containerData.appendChild(userComment)
					commentWrapper.appendChild(profileImage)
					commentWrapper.appendChild(containerData)

					myComments.appendChild(commentWrapper)
					isUserComment = true
				}
			})
		}
	})
	containerCommentsAdd.appendChild(publicationImageData)
	containerCommentsAdd.appendChild(myComments)

	containerCommentsAdd.addEventListener('keydown', async (event) => {
		if (event.target.id === 'post_comment' && event.key === 'Enter') {
			const responseComment = await postComments(idPublication)

			if (responseComment) {
				alert('commented successfully!')
				location.reload()
			} else {
				alert("ERROR: Couldn't post the comment")
			}
		}
	})
}

const postComments = async (id) => {
	const url = `https://back-spider.vercel.app/publicacoes/commentPublicacao/${id}`
	const idUser = localStorage.getItem('idUser')
	const description = document.getElementById('post_comment').value

	const body = {
		idUser: idUser,
		descricao: description
	}

	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	}

	const response = await fetch(url, options)

	if (response.status === 200) {
		const data = await response.json()
		return data
	} else {
		return false
	}
}

const getAllPublications = async () => {
	const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
	const response = await fetch(url)

	if (response.status === 200) {
		const data = await response.json()

		return data
	} else {
		return false
	}
}

const getUserById = async (id) => {
	const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`
	const response = await fetch(url)

	if (response.status === 200) {
		const data = await response.json()

		return data
	} else {
		return false
	}
}

getUserById(sessionStorage.getItem('idUserPublication')).then((nameUser) => (document.title = `Comments on ${nameUser.nome}'s post`))
listAllComments()
