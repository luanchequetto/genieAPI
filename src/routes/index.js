const express = require('express');
const { default: GenieAcsControllers } = require('../Controllers/GenieAcsControllers');
const router = express.Router();

const genieAcsControllers = new GenieAcsControllers;

router.get('/genie/setTag', genieAcsControllers.setTag)
router.get('/genie/unsetTag', genieAcsControllers.unsetTag)

export default router;