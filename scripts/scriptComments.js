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
	const publicationImageData = document.createElement('aside')
	const myComments = document.createElement('section')
	const publicationUser = await getAllPublications()

	publicationImageData.id = 'container_publication_data'
	myComments.id = 'my_comments'

	publicationUser.forEach((publications) => {
		if (publications.id == idPublication) {
			publications.comentarios.forEach(async (comments) => {
				const user = await getUserById(comments.idUsuario)
				const userComment = document.createElement('article')
				const numberOfLikes = publications.curtidas.length
				const numberOfComments = publications.comentarios.length

				userComment.classList.add('user_comment')

				userComment.innerHTML = `
											<img src="${user.imagemPerfil}" alt="user_image" id="user_image">
											<div id="user_info">
												<h1 id="user_name">${user.nome}</h1>
												<p id="user_comment_text">${comments.descricao}</p>
											</div>
										`

				publicationImageData.innerHTML = `      
													<img src="${publications.imagem}" alt="publication_image" id="publication_image">
													<div id="container_publication_info">
														<p>${publications.dataPublicacao}</p>
														<p>${numberOfLikes} Likes</p>
														<p>${numberOfComments} Comments</p>
													</div>
												`

				myComments.innerHTML = `                
											<h1>Your comments stay here</h1>
											<input type="text" id="post_comment" placeholder="Add a comment..." autocomplete="off">
										`

				containerCommentsAllUsers.appendChild(userComment)
			})
		}
	})
	containerCommentsAdd.appendChild(publicationImageData)
	containerCommentsAdd.appendChild(myComments)

	containerCommentsAdd.addEventListener('keydown', async (event) => {
		if (event.target.id === 'post_comment' && event.key === 'Enter') {
			const responseComment = await postComments(idPublication)
			const oldCommentMessage = myComments.querySelector('h1')

			if (responseComment) {
				const idUser = localStorage.getItem('idUser')
				const userInfo = await getUserById(idUser)

				publicationUser.forEach((publications) => {
					if (publications.id == idPublication) {
						publications.comentarios.forEach((comments) => {
							if (idUser === comments.idUsuario) {
								const profileImage = document.createElement('img')
								const containerData = document.createElement('div')
								const userName = document.createElement('h1')
								const userComment = document.createElement('p')

								profileImage.src = userInfo.imagemPerfil
								profileImage.alt = 'my_image'
								profileImage.id = 'my_image'

								containerData.id = 'my_info'
								userName.id = 'my_name'
								userName.textContent = userInfo.nome
								userComment.id = 'my_comment'
								userComment.textContent = comments.descricao

								oldCommentMessage.replaceChildren('')
								containerData.appendChild(userName)
								containerData.appendChild(userComment)
								myComments.appendChild(profileImage)
								myComments.appendChild(containerData)
							}
						})
					}
				})
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
