const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealers_choice_spa_db');

const Game = sequelize.define('game', {
    name: {
        type: Sequelize.STRING
    }
})

const express = require("express")
const app = express()
const path = require("path")

app.use('/src', express.static(path.join(__dirname, 'src')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/games', async(req, res, next) => {
    try {
        res.send(await Game.findAll())
    } catch(err) {
        console.log(err)
    }
})

app.delete('/api/games/:id', async(req, res, next) => {
    try {
        const game = await Game.findByPk(req.params.id)
        await game.destroy()
        res.sendStatus(204)
    } catch(err) {
        console.log(err)
    }
})


const init = async(req, res, next) => {
    try {
        await sequelize.sync({force: true});
        await Game.create({name: 'Elden Ring'})
        await Game.create({name: 'Nintendo Switch Sports'})
        await Game.create({name: 'Mario Strikers'})
        await Game.create({name: 'Sonic Frontiers'})
        
        const port = process.env.PORT || 8080;
        app.listen(port, ()=> console.log(`listening on port ${port}`))
        
        
    } catch(err) {
        console.log(err);
    }
}

init();