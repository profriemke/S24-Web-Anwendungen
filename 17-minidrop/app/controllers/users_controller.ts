import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

    public async login({ request, view, session, response }:HttpContext) {
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
    }
}