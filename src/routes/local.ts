import express, { Request } from "express";
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

const satelliteIdRouteValidation = (expressRequest: Request): boolean => {
  const id = expressRequest.params.id
  const idCheck = pattern(string(), /[0-9]+/)

  if (!id) return false
  try {
    assert(id, idCheck)
  } catch {
    return false
  }
  return true
}

const satelliteNameRouteValidation = (expressRequest: Request): boolean => {
  const name = expressRequest.params.officialName
  if (!name) return false
  return true
}

router.get("/two-line-elements/:id", (req, res) => {
  if (!satelliteIdRouteValidation(req)) return res.sendStatus(400)

  n2yo
    .getTwoLineElements(req.params.id!)
    .then((result) => res.json(result))
    .catch(() => res.sendStatus(400));
});

router.get("/satellite/by-id/:id", (req, res) => {
  if (!satelliteIdRouteValidation(req)) return res.sendStatus(400)

  return SatelliteUtilities.getSatelliteById(req.params.id!)
    .then((satelliteDoc) => {
      if (!satelliteDoc) return res.sendStatus(400);
      return res.json(_.pick(satelliteDoc, PROPS_TO_SEND_IN_RESPOSNE));
    })
    .catch(() => {
      return res.sendStatus(400);
    });
})

router.get("/satellite/by-name/:name", (req, res) => {
  if (satelliteNameRouteValidation(req)) return res.sendStatus(400)

  return SatelliteUtilities.getSatelliteByName(req.params.name!)
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
