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
import app from '@adonisjs/core/services/app'
import { cuid } from '@adonisjs/core/helpers'
import { request } from 'http'

router.get('/register', async ({view})=>{
    return view.render('pages/register')
})

router.post('/register', async ({request, response})=>{
    const login = request.input('login')
    const password = request.input('password')

    const result = await db.table('user').insert({
        login: login,
        password: await hash.make(password)
    })
    return response.redirect('/login')
})

router.get('/download/:id', async ({session, response, params})=>{
    if(!session.get('login')){
        return response.redirect('/login')
    }
    const result = await db.from('files').select('*').where({
        user_login: session.get('login'),
        id: params.id
    }).first()
    if(!result){
        return "Nicht vorhanden / keine Berechtigung"
    }
    const filePath = app.makePath('files', result.name_server)
    return response.download(filePath)
    
})

router.get('/', async ({ view, session, response })=>{
    if(!session.get('login')){
        return response.redirect('/login')
    }
    const files = await db.from('files').select('*').where({user_login:session.get('login')} )
    return view.render('pages/home.edge', {files, login: session.get('login')})
})

router.post('/upload', async({response, request, session})=>{
    if(!session.get('login')){
        return response.redirect('/login')
    }
    const file = request.file('file', {size: '300mb'})
    if(!file){
        return response.redirect('/upload')
    }
    if(!file.isValid){
        return response.redirect('upload')
    }
    await file.move(app.makePath('files'), {name: cuid()+'.'+file.extname})
    const result = await db.table('files').insert({
        name_original: file.clientName,
        name_server: file.fileName,
        user_login: session.get('login')
    })
    return response.redirect('/')
})


router.get('/upload', async ({view, session, response})=>{
    if(!session.get('login')){
        return response.redirect('/login')
    }
    return view.render('pages/upload')
})

router.get('/hash', async ({view})=>{
    return await hash.make('123')
})

router.get('/login', ({view})=>{
    return view.render('pages/login')
})

router.post('/login', async ({response, request, session})=>{
    const login = request.input('login')
    const password = request.input('password')

    const result = await db.from('user').select('*').where({ login }).first()
    if(!result){
        return response.redirect('/login')
    }
   const verify = await hash.verify(result.password, password)
   if(!verify){
        return response.redirect('/login')
   }
   session.put('login', login)
   return response.redirect('/')
})