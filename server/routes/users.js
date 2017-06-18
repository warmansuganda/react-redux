import express from 'express';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

import commonValidation from '../shared/validations/signup';
import Users from '../models/Users';

let router = express.Router();

function validateInput(data, otherValidation) {
    let {errors} = otherValidation(data);
    // With Promise
    return Promise.all([
        Users.where({email: data.email}).fetch().then(user => {
            if (user) {errors.email = 'There is user with such email'}
        }),
        Users.where({username: data.username}).fetch().then(user => {
            if (user) {errors.username = 'There is user with such username'}
        })
    ]).then(() => {
        return {
            errors,
            isValid: isEmpty(errors)
        }
    });

    // return Users.query({
    //     where: {email: data.email},
    //     orWhere: {username: data.username}
    // }).fetch().then(user => {
    //     if (user) {
    //         if (user.get('username') === data.username){
    //             errors.username = 'There is user with such username';
    //         }
    //         if (user.get('email') === data.email){
    //             errors.email = 'There is user with such email';
    //         }
    //     }

    //     return {
    //         errors,
    //         isValid: isEmpty(errors)
    //     }
    // });
}

router.post('/', (req, res) => {
    // console.log(req.body);
    // const { errors, isValid } = validateInput(req.body);
    validateInput(req.body, commonValidation).then(({errors, isValid}) => {
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


});

export default router;