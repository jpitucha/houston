import express from "express";
import n2yo from "./../api/n2yo/index.js";
import SatelliteUtilities from "../utils/satelliteUtils";
import _ from "lodash";
import SatelliteResponseInterface from '../utils/types/parialSatelliteInterface'
import { assert, pattern, string } from 'superstruct'

const router = express.Router();
const PROPS_TO_SEND_IN_RESPOSNE = [
  "_id",
  "officialName",
  "perigee",
  "apogee",
  "operator",
  "operatorCountry",
  "purpose",
];


router.get("/two-line-elements/:id", (req, res, next) => {
  const id = req.params.id
  const idCheck = pattern(string(), /[0-9]+/)

  if (!id) return res.sendStatus(400)
  try {
    assert(id, idCheck)
  } catch {
    return res.sendStatus(400)
  }
  req.id = id
  next()
}, (req, res) => {
  n2yo
    .getTwoLineElements(req.id)
    .then((result) => res.json(result))
    .catch(() => res.sendStatus(400));
});

router.get("/satellite/by-id/:id", (req, res, next) => {
  const id = req.params.id
  const idCheck = pattern(string(), /[0-9]+/)

  if (!id) return res.sendStatus(400)
  try {
    assert(id, idCheck)
  } catch {
    return res.sendStatus(400)
  }
  req.id = id
  next()
}, (req, res) => {
  return SatelliteUtilities.getSatelliteById(req.id)
    .then((satelliteDoc) => {
      if (!satelliteDoc) return res.sendStatus(400);
      return res.json(_.pick(satelliteDoc, PROPS_TO_SEND_IN_RESPOSNE));
    })
    .catch(() => {
      return res.sendStatus(400);
    });
})

router.get("/satellite/by-name/:name", (req, res, next) => {
  const name = req.params.name

  if (!name) return res.sendStatus(400)
  req.name = name
  next()
}, (req, res) => {
  return SatelliteUtilities.getSatelliteByName(req.name)
    .then((satelliteDoc) => {
      if (!satelliteDoc) return res.sendStatus(400);
      const satellitesArray = <SatelliteResponseInterface[]>(
        satelliteDoc.map((satellite) =>
          _.pick(satellite, PROPS_TO_SEND_IN_RESPOSNE)
        )
      );
      return res.json(satellitesArray);
    })
    .catch(() => {
      return res.sendStatus(400);
    });
})

export default router;
