import express from 'express';


const router = express.Router();

router.route('/users')
// .get(validate(userValidator.readAll), User.readAll);
   .get((req, res) =>{
     console.log('route /user works');
     res.json("hey")
   });

export default router;
