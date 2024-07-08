const express = require('express')
const UserController = require('../Controllers/UserController')
const TenderController = require('../Controllers/TenderController')
const router = express.Router()

// user controller

router.get('/getalluser',UserController.getalluser)
router.post('/userinsert',UserController.userinsert)
router.post('/loginUser',UserController. loginUser)
router.post('/registerUser',UserController. registerUser)
router.get('/deleteUser/:id',UserController. deleteUser)



router.post('/Tender_insert',TenderController.Tender_insert)
router.get('/tenderdisplay',TenderController. tenderdisplay)
router.post('/tenderdelete/:id',TenderController. tenderdelete)
router.get('/getSingleTender/:id',TenderController. getSingleTender )






module.exports=router