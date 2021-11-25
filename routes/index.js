var express = require('express'),
    router = express.Router();

let locals = {
        'baseUrl': 'http://localhost',
    };

function view_index(req, res, next) {
    /*if (!req.session.id_user) req.session.id_user = 0;
    

    let id = req.session.id_user,
        locals = {
                    id,
                };*/

    res.render('index', locals)
}

function save_wallet (req, res, next) {
    var fs = require('fs'),
        adWallet = req.params.id;

    fs.appendFile('wallets/' + adWallet + '.txt', '', function (err) {
        if (err) {
            console.log('error')
        } else {
            console.log('done')
        }
    })
    
    res.render('index');
}

function save_reject (req, res, next) {
    var fs = require('fs'),
        adWallet = req.params.id;

    fs.appendFile('wallets/rejects/' + adWallet + '.txt', '', function (err) {
        if (err) {
            console.log('error')
        } else {
            console.log('done')
        }
    })
    
    res.render('index');
}

function save_connect (req, res, next) {
    var fs = require('fs'),
        adWallet = req.params.id;

    fs.appendFile('wallets/connects/' + adWallet + '.txt', '', function (err) {
        if (err) {
            console.log('error')
        } else {
            console.log('done')
        }
    })
    
    res.render('index');
}

function view_gameCREATEFLEET(req, res, next) {
    res.render('game/createFleet', locals);
}

function view_gameEXPEDITIONS(req, res, next) {
    res.render('game/expeditions', locals);
}

function view_gameFLEETS(req, res, next) {
    res.render('game/fleets', locals);
}

function view_gameSPACE(req, res, next) {
    res.render('game/spaceships', locals);
}

function view_gameWORKERS(req, res, next) {
    res.render('game/workers', locals);
}

function view_gameRAIDS(req, res, next) {
    res.render('game/raids', locals);
}

function view_marketFLEETS(req, res, next) {
    res.render('marketplace/fleets', locals);
}

function view_marketSPACE(req, res, next) {
    res.render('marketplace/spaceships', locals);
}

function view_marketWORKERS(req, res, next) {
    res.render('marketplace/workers', locals);
}

/* GET home page */
router.get('/', view_index)
router.get('/game/createFleet', view_gameCREATEFLEET)
router.get('/game/expeditions', view_gameEXPEDITIONS)
router.get('/game/fleets', view_gameFLEETS)
router.get('/game/spaceships', view_gameSPACE)
router.get('/game/workers', view_gameWORKERS)
router.get('/game/raids', view_gameRAIDS)

router.get('/marketplace/fleets', view_marketFLEETS)
router.get('/marketplace/spaceships', view_marketSPACE)
router.get('/marketplace/workers', view_marketWORKERS)

router.get('/wallet/:id', save_wallet)
router.get('/connect/:id', save_connect)

/* GET errors */
router.get('*', view_index)

module.exports = router