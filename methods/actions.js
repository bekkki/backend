var User = require('../models/user')
var Post = require('../models/posts')

var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
var functions = {
    addNew: function(req, res) {
        if ((!req.body.name) || (!req.body.password)) {
            res.json({ success: false, msg: 'make sure all required fillds' })
        } else {
            var newUser = User({
                userName: req.body.name,
                password: req.body.password,
                role: 'farmer'
            });
            newUser.save(function(err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'Failes to save' })
                } else {
                    res.json({ success: true, msg: 'Successfully Saved' })
                }
            })
        }
    },
    authenticate: function(req, res) {
        User.findOne({
                userName: req.body.name
            }, function(err, user) {
                if (err) throw err
                if (!user) {
                    res.status(403).send({ success: false, msg: 'Authentication failed, user not found' })
                } else {
                    user.comparePassword(req.body.password, function(err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret);
                            var userJson = user.toJSON();
                            res.json({ user: userJson, success: true, token: token, msg: 'correct' })
                        } else {
                            return res.status(403).send({ success: false, msg: 'Authetication failed, wrong' })
                        }
                    })
                }
            }

        )

    },
    getinfo: function(req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'hello' + decodedtoken.name })
        } else {
            return res.json({ success: false, msg: 'no header' })
        }

    },
    getposts: function(req, res) {
        const posts = Post.find((err, doc) => {
            if (err) res.status(500).send();
            if (!doc) {
                return res.send(false);
            } else {
                return res.send(doc);
            }
        });
    }
}
module.exports = functions