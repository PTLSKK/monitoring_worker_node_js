var express = require('express');
var knex = require('../database');
var response = require('../core').response;
var router = express.Router();

function getAverage(arr) {
  let sum = arr.reduce((previous, current) => (current += previous));
  let avg = sum / arr.length;
  return avg;
}

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

    res
      .status(200)
      .json(response.build('Successfully Insert Data', 200, 'success', doc));
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json(response.error('Something went wrong', 400, 'error', err));
  }
});

router.get('/log', async (req, res) => {
  try {
    const data = await knex('log');

    const singleData = await knex('log')
      .orderBy('timestamp', 'desc')
      .limit(1);

    console.log(`single => ${singleData[0].cpu_usage}`);

    const arrCpu = [];
    const arrMemory = [];
    const arrDrivesA = [];
    const arrDrivesB = [];
    const arrNetworkUp = [];
    const arrNetworkDown = [];

    data.forEach(el => {
      arrCpu.push(parseFloat(el.cpu_usage));
      arrMemory.push(parseFloat(el.memory_used_percent));
      arrDrivesA.push(parseFloat(el.drives_a));
      arrDrivesB.push(parseFloat(el.drives_b));
      arrNetworkUp.push(parseFloat(el.network_up));
      arrNetworkDown.push(parseFloat(el.network_down));
    });

    const cpuAvg = getAverage(arrCpu);
    const memAvg = getAverage(arrMemory);

    const avgDriveA = getAverage(arrDrivesA);
    const avgDriveB = getAverage(arrDrivesB);
    const avgNetUp = getAverage(arrNetworkUp);
    const avgNetDown = getAverage(arrNetworkDown);

    var dataJson = {
      cpu_usage: cpuAvg,
      memory_used_percent: memAvg,
      drives_a: avgDriveA,
      drives_b: avgDriveB,
      network_up: avgNetUp,
      network_down: avgNetDown,
      timestamp: singleData[0].timestamp,
      uptime: singleData[0].uptime,
      uptime: singleData[0].uptime,
      system: singleData[0].system
    };

    res
      .status(200)
      .json(response.build('Successfully Get Data', 200, 'success', dataJson));
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json(response.error('Something went wrong', 400, 'error', error));
  }
});

module.exports = router;
