import express from 'express';
import bcrypt from 'bcrypt';

import validateInput from '../shared/validations/signup';
import Users from '../models/Users';

let router = express.Router();

router.post('/', (req, res) => {
    // console.log(req.body);
    const { errors, isValid } = validateInput(req.body);

    if (isValid) {
        // res.json({success: true});
        const {username, password, email, timezone} = req.body;
        const password_digest = bcrypt.hashSync(password, 10);

        Users.forge({
            username, password_digest, email, timezone
        }, {hasTimestamps: true}).save().then(user => 
            res.json({success: true})
        ).catch(err =>
            res.status(500).json({error: err})
        );
    } else {    
        res.status(400).json(errors);
    }

});

export default router;