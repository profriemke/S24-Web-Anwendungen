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

let count = 0

const votes = {
    spitze: 0,
    geht: 0,
    weg:0
}

router.get('/kunden', async({ view })=>{
    const kunden = await db.from('kunde').select('*').where({ort: 'Stuttgart'}).limit(30)
    console.log(kunden)
    return view.render('pages/kunden', { kunden })

})

router.post('/vote', async({ request, view })=>{

    switch(request.input('vote')){
        case 'spitze': votes.spitze++
        break
        case 'geht': votes.geht++
        break
        case 'weg' : votes.weg++
        break
    }
    /**
    const result =  request.input('vote')
    if(result==='spitze'){
        votes.spitze++
    }
    if(result==='geht'){
        votes.geht++
    }
    if(result==='weg'){
        votes.weg++
    } */

    return view.render('pages/votes_result', { votes })
})


router.get('/vote', async({ view })=>{
    return view.render('pages/vote')
})



router.get('/count', async({view })=>{
    count++
    return view.render('pages/count', { count: count })
})


router.get('/nutzer', async({ view })=>{
    return view.render('pages/nutzer')
})

router.post('/nutzer/anzeigen', async({ request, view })=>{
    // const { vorname, nachname }  =   request.all()
    const vorname = request.input('vorname')
    if(vorname === undefined){
        return 'Fehler'
    }
    if(!vorname){
        return 'Kein Vorname angegeben'
    } 

    return view.render('pages/nutzer_anzeigen', { vorname: vorname })
})

router.get('/omm', async()=>{
    return 'Hello OMM from AdonisJS'
})

router.get('/', async({ view })=>{
    //console.log(await view.render('pages/index'))
    return view.render('pages/index', { gruss: 'Hallo', studiengang: 'OMM' })
})

router.get('/namen', async({ view })=>{
    return view.render('pages/namen', { namen: ['Max', 'Moritz', 'Erika', 'Horst'], isLoggedIn: false })
})

router.get('/personen', async({ view })=>{
    const personen  = [
        { vorname: 'Max', nachname: 'Mustermann', alter: 23 },
        { vorname: 'Erika', nachname: 'Musterfrau', alter: 21 },
        { vorname: 'Moritz', nachname: 'Mustermann', alter: 25 },
    ]
    return view.render('pages/personen', { personen })
})


router.get('/context', async(ctx)=>{
    return ctx
})

router.get('/nichtmachen', async()=>{
    return `<html>
            <head>  
            </head>
            <body>
                hallo
            </body>    
            </html>`
})