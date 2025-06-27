const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');

router.route('/')
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    const payload ={
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
    }
    data.employees.push(payload);
    res.json({...data.employees});
  })
  .put((req, res) => {
    res.json({
      "firstname": req.body.firstname,
      "lastname": req.body.lastname,
    })
  })
  .delete((req, res) => {
    res.json({"id": req.body.id})
  });

router.route('/:id')
  .get((req, res) => {
    res.json({ "id": req.params.id})
  })

module.exports = router;