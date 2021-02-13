import express from "express";
import n2yo from "./../api/n2yo/index.js";
import SatelliteUtilities from "../utils/satelliteUtils";
import _ from "lodash";
import SatelliteResponseInterface from '../utils/types/parialSatelliteInterface'
import { satelliteIdRouteValidation } from './../validators/satelliteIdValidator'
import { satelliteNameRouteValidation } from './../validators/satelliteNameValidator'
import { RequestWithID, RequestWithName } from './../utils/types/extendedRequestInterface'

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

router.get("/two-line-elements/:id",
  (req, res, next) => satelliteIdRouteValidation(req, res, next),
  (req: RequestWithID, res) => {
    n2yo
      .getTwoLineElements(req.params.id)
      .then((result) => res.json(result))
      .catch(() => res.sendStatus(400));
  });

router.get("/satellite/by-id/:id",
  satelliteIdRouteValidation,
  (req: RequestWithID, res) => {

    return SatelliteUtilities.getSatelliteById(req.params.id)
      .then((satelliteDoc) => {
        if (!satelliteDoc) return res.sendStatus(400);
        return res.json(_.pick(satelliteDoc, PROPS_TO_SEND_IN_RESPOSNE));
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  })

router.get("/satellite/by-name/:name",
  satelliteNameRouteValidation,
  (req: RequestWithName, res) => {
    return SatelliteUtilities.getSatelliteByName(req.params.name)
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
