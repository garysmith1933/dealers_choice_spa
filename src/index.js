const ul = document.querySelector('ul')



ul.addEventListener('click', async(ev) => {
    if (ev.target.tagName === 'LI') {
        const id = ev.target.getAttribute('data-id')
        await axios.delete(`api/games/${id}`)
        init()
    }

})

const init = async(req, res, next) => {
    try {
       const response = await axios.get('api/games')
       const games = response.data
       
       const html = games.map(game => {
           return `
           <li data-id= ${game.id}> ${game.name} </li>
           
           `
       }).join('')
       
       ul.innerHTML = html
    } catch(err) {
        console.log(err)
    }
}

init()