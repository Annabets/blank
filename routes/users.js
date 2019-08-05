const express = require('express');
const router = express.Router();
const log = require('../lib/log')(module);
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/User');
require('../lib/passport');

router.get('/',(req,res)=>{
    User.find({},(err,users)=>{
      if (err) throw err;
      res.json(users);
    })
});

router.get('/:id?',(req,res)=>{
    User.findOne({_id: req.params.id})
        .then(user=>{res.json(user)})
        .catch(error=>{log.error(error.message);res.json({})})
});

router.delete('/:id?', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.deleteOne({_id:req.params.id})
            .then(result => {log.info('number of deleted records: ' + result.deletedCount)})
            .catch(err=>{log.error(err)})
        res.end();
    }
);

router.put('/:id?',passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOneAndUpdate({_id:req.params.id},req.body)
            .then(user => {
                log.info('updated record: ' + user);
                res.json(user);
            })
            .catch(err=>{
                log.error(err.message);
                res.end();
            })
    });

router.post('/register',(req,res)=>{

    User.exists({username:req.body.username})
        .then(userExists => {
            if(!userExists){
                const newUser = new User({
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    username:req.body.username,
                    hash:''
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(req.body.password,salt,(err,hash)=>{
                        if (err) throw err;
                        newUser.hash = hash;
                        newUser.save()
                            .then(user => {
                                res.status(201).end();
                            })
                            .catch(err => {
                                log.error(err.message);
                                res.status(500).end();
                            })
                    })
                })
            } else{
                log.error('user already exists');
                res.status(409).end();
            }
        })
});

router.post('/authenticate',(req,res)=>{
    passport.authenticate('local',{},(err,user,info)=>{
        if (err || !user) res.status(400).json({message:info.message});

        const token = jwt.sign({user},config.get('jwt:secret'));
        res.json(user.toAuthJSON(token));
    })(req,res);
});

module.exports = router;