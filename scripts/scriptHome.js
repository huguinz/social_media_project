'use strict'

const getAllPublications = async () => {
	const publications = document.getElementById('publications')
	const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes'
	const response = await fetch(url)

	if (response.status === 200) {
		const data = await response.json()

		data.forEach((item) => {
			const teste = document.createElement('img')
			teste.src = item.imagem
			publications.appendChild(teste)
		})
	}
}

getAllPublications()
