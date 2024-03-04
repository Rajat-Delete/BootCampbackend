const express = require('express');
const { BootCampController } = require('../../controllers');
const {BootCampMiddleware} = require('../../middlewares')
const router = express.Router();

router.get('/' ,BootCampController.getBootcamps);

router.get('/:id',BootCampMiddleware.validateObject ,BootCampController.getBootcampsById);

router.post('/' ,BootCampController.postBootcamps);

router.put('/:id' ,BootCampMiddleware.validateObject,BootCampController.putBootcampsById);

router.delete('/:id' ,BootCampMiddleware.validateObject,BootCampController.deleteBootcampsById);

module.exports = router;