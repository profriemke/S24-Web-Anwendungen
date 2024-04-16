/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

router.get('/', async({ view })=>{
    const posts = await db.from('posts').select('*')
    console.log(posts)
    return view.render('pages/home', { posts })
})

router.get('/admin/post/create', async({ view })=>{
    return view.render('pages/admin/post_create')
})

router.post('/admin/post/create', async({ request, response })=>{
    const { title, teaser, text } = request.all()
    const result = await db.table('posts').insert({ title, teaser,text, date: new Date().toString(), author: 1 })
    return response.redirect('/')
})

router.get('/post/:id', async({ view, params })=>{
    const post = await db.from('posts').where('id', params.id).first()
    return view.render('pages/post', { post })
})