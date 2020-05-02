const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function()  {
        const userCount = await app.db('users').count('id').first()
        const categoryCount = await app.db('categories').count('id').first()
        const articleCount = await app.db('articles').count('id').first()

        const {Stat} = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            {sort: { 'createdAt': -1 }})

        const stat = new Stat({
            users: userCount.count,
            categories: categoryCount.count,
            articles: articleCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users 
        const changeCategories = !lastStat || stat.categories !== lastStat.categories 
        const changeArticles = !lastStat || stat.articles !== lastStat.articles 

        if (changeUsers || changeCategories || changeArticles) {
            stat.save().then(() => console.log('[Stats] Estatisticas atualizadas'))
        }

    })
}