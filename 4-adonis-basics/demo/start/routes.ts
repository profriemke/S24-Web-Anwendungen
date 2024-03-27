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
    return 'Hello OMM (mit neuem Logo ab Dienstag)! '
})

