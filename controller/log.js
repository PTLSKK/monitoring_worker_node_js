var express = require('express');
var knex = require('../database');
var response = require('../core').response;
var router = express.Router();

router.post('/log', async (req, res) => {
  try {
    const {
      cpu_usage,
      memory_used_percent,
      drives,
      network_up,
      network_down,
      timestamp,
      uptime,
      uuid,
      system
    } = req.body;

    const jsonSystem = JSON.parse(system);
    const strSystem = `${jsonSystem.name} ${jsonSystem.version}`;

    const jsonDrives = JSON.parse(drives);

    const drives_a = jsonDrives[0].percent_used;
    const drives_b = jsonDrives[1].percent_used;

    const doc = await knex('log').insert({
      cpu_usage,
      memory_used_percent,
      drives_a,
      drives_b,
      network_up,
      network_down,
      timestamp,
      uptime,
      uuid,
      system: strSystem
    });

    res.json(response.build('Successfully Insert Data', 200, 'success', doc));
  } catch (err) {
    console.log(err);

    res.json(response.error('Something went wrong', 400, 'error', err));
  }
});

module.exports = router;
