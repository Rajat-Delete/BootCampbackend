const express = require('express');
const { BootCampController } = require('../../controllers');
const router = express.Router();

router.get('/' ,BootCampController.getBootcamps);

router.get('/:id' ,BootCampController.getBootcampsById);

router.post('/' ,BootCampController.postBootcamps);

router.put('/:id' ,BootCampController.putBootcampsById);

router.delete('/:id' ,BootCampController.deleteBootcampsById);

module.exports = router;