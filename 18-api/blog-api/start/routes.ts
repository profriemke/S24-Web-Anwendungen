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
import PostsController from '#controllers/posts_controller'
import UsersController from '#controllers/users_controller'


router.get('/statistik', async ({ view })=>{
    const data = [
            {course: "om7", number: 40},
            {course: "wi7", number: 30},
            {course:"id7", number: 20},
            {course:"sm7", number: 15},
            {course:"iw7", number: 10}
    ]

    return view.render('statistik', {data})
})

router.get('/api/posts', async ()=>{
        const posts = await db.from('posts').select('*')
        return JSON.stringify(posts)
})


// Post-Routen
router.get('/', [PostsController, 'index'])
router.get('/post/:id', [PostsController, 'show'])

//User-Routen
router.post('/login',[UsersController, 'login'])




router.get('/login', async({ view })=>{
    return view.render('pages/login')
})

router.get('/about', async({ view })=>{
    return view.render('pages/about',{ pageTitle: 'About - Mein Blog'})
})

router.get('/logout', async({ session, response })=>{
    session.forget('user')
    return response.redirect('/')
})




router.get('/admin/post/create', async({ view, session, response })=>{
    if(!session.get('user')){
        return response.redirect('/login')
    }
    return view.render('pages/admin/post_create')
})

router.post('/admin/post/create', async({ request, response, session })=>{
    if(!session.get('user')){
        return response.redirect('/login')
    }

    const { title, teaser, text } = request.all()
    const result = await db.table('posts').insert({ title, teaser,text, date: new Date().toString(), author: 1 })
    return response.redirect('/')
})


router.get('/edit/:id', async({ view, params, session, response })=>{
    if(!session.get('user')){
        return response.redirect('/login')
    }
    const post = await db.from('posts').where({
        id: params.id,
    }).first()
    return view.render('pages/admin/post_edit', { post: post })

})

router.post('/edit', async({ request, response, session })=>{
    if(!session.get('user')){
        return response.redirect('/login')
    }
    const result = await db.from('posts')
                   .update(
                     { title: request.input('title'), 
                       teaser: request.input('teaser'), 
                       text: request.input('text'),
                       date: new Date().toString()
                    })
                    .where(
                      {
                        id: request.input('id')
                    })
    if(!result){
        return 'Fehler'
    }
    return response.redirect('/post/'+request.input('id'))
})

router.get('/session/a', async({ response, session })=>{
    session.put('name', 'RIemke')
    return response.redirect('/')
})

router.get('/session/b', async({ session })=>{
    const name = session.get('name')
    return name
})

router.get('/session/count', async({ session })=>{
    if(session.get('count') === undefined){
        session.put('count',1)
    }else{
        session.put('count', session.get('count') + 1)
    }
    return session.get('count')
})

router.get('/hash', async()=>{
    return await hash.make('123')
})