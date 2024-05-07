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

router.post('/login', async({ request, view, session, response })=>{
    const { login, password } = request.all()
    const user = await db.from('user').where('login', login).first()
    if(!user){
        console.log('User not found')
        return view.render('pages/login', { error: 'User not found'})
    }
    const passwordValid = await hash.verify( user.password, password)

    if(passwordValid){
        console.log('User logged in')
        session.put('user', { login: user.login, vorname: user.vorname, 
            nachname: user.nachname })
        return response.redirect('/')
    }
    console.log('Password invalid')
    return view.render('pages/login', { error: 'Password invalid'})
})


router.get('/', async({ view, session })=>{
    let user = undefined
    if(session.get('user')){
        user = session.get('user')
    }

    const posts = await db.from('posts').select('*')
    console.log(posts)
    return view.render('pages/home', { posts, user, pageTitle: 'Home - Mein Blog'})
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

router.get('/post/:id', async({ view, params, session })=>{
    const post = await db.from('posts').where('id', params.id).first()
    const author = await db.from('user').select('vorname','nachname').where('login', post.author).first()
    return view.render('pages/post', { post, author, pageTitle: post.title+' - Mein Blog', user:session.get('user') })
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