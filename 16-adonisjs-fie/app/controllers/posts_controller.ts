import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class PostsController {
    
    // Startseite ausgeben
    public async index({ view, session }:HttpContext) {
    let user = undefined
    if(session.get('user')){
        user = session.get('user')
    }
    const posts = await db.from('posts').select('*')
    console.log(posts)
    return view.render('pages/home', { posts, user, pageTitle: 'Home - Mein Blog'})
    }
   
    // einzelnen Post anzeigen
    public async show({ view, params, session }:HttpContext) {
     const post = await db.from('posts').where('id', params.id).first()
     const author = await db.from('user').select('vorname','nachname').where('login', post.author).first()
    return view.render('pages/post', { post, author, pageTitle: post.title+' - Mein Blog', user:session.get('user') })
    }

}