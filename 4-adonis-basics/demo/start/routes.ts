/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/omm', async()=>{
    return 'Hello OMM from AdonisJS'
})

router.get('/', async({ view })=>{
    //console.log(await view.render('pages/index'))
    return view.render('pages/index', { gruss: 'Hallo', studiengang: 'OMM' })
})

router.get('/namen', async({ view })=>{
    return view.render('pages/namen', { namen: ['Max', 'Moritz', 'Erika', 'Horst'] })
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