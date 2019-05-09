const express = require('express');
const router = express.Router();
const helper = require('../helpers/file-helpers');

// GET file test
router.get('/:site', function(req, res, next) {
  // const site = req.param('site');
  const site = req.params.site;
  res.send(site);
});

// POST file 
router.post('/', function (req, res, next) {
  const site = req.body.site;  
  helper.getSiteHtml(true, site).then(() => {
    res.send({"response": "success"});
  }).catch(() => {
    res.send({"response": "error"});
  });
});

module.exports = router;
