const bcrypt = require('bcryptjs');

module.exports = {
    register: (req, res) => {
        //Make sure we have all of our information
        const {username, password, email, name} = req.body;
        if(!username || !password || !email || !name) {
            res.status(406).json({
                error: "Please fill in all information"
            });
        } else {
            //Check to see if the username is already taken
            const db = req.app.get('db');
            db.checkForUser(username).then(users => {
                if(users.length > 0) {
                    res.status(401).json({error: "Username Already Taken"});
                } else {
                    //Hash the password
                    bcrypt.hash(password, 10).then(hash => {
                        //put them in the database
                        console.log(hash);
                        db.addUser(username, hash, email, name).then(() => {
                            //send a response
                            req.session.user = {
                                username,
                                email,
                                name,
                                balance: 0
                            }
                            res.status(200).json(req.session.user);
                        })
                    })
                }
            })
        }
    }
}