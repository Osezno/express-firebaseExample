
var express = require('express');
var router = express.Router();

const catalogs = require('../config/catalogs');
const validations = require('../config/validations');
const firebase = require('../config/Firebase');

const { resMessage, success } = catalogs;
const { checkNull, checkLength } = validations;

const valid = (prop, min = 2, max = 20) => {
  if (checkNull(prop)) return false
  if (checkLength(prop, min, max)) return false
  else return true
}

router.get('/getCars', async (req, res) => {
  const { getCars } = firebase;
  let clientRes = { ...resMessage }
  getCars().then(cars => {
    let carros = [];
    cars.forEach(car => carros.push(
      {
        ...car.data(),
        id: car.id
      }))

    clientRes["success"] = true;
    clientRes["data"] = carros;
    clientRes["message"] = success.getCars;
    return res.send(clientRes);
  }).catch(e => {
    console.log(e); // "oh, no!"
    return res.send(clientRes);
  })
})

router.get('/createCars', (req, res) => {
  //esta solo ruta ya no es necesaria 
  //para usarse una vez
  const { carJson } = catalogs;
  const { createCar } = firebase;
  carJson.map(data => createCar(data))
  return res.send("carros creados");
})

router.post('/updateCars', async (req, res) => {
  const { registerUserData } = firebase;
  const { nombre, id } = req.body
  let clientRes = { ...resMessage }

  if (!checkNull(id) &&
    valid(nombre)) {
    try {
      registerUserData(id,nombre);
    }
    catch (e) {
      console.log(e)
      return res.send(clientRes);
    } finally {
      clientRes["success"] = true;
      clientRes["data"] = {};
      clientRes["message"] = success.updated;
      return res.send(clientRes);
    }
  }
  return res.send(clientRes);
})


module.exports = router;