import express from "express";
import n2yo from "./../api/n2yo/index.js";
import SatelliteUtilities from "../utils/satelliteUtils";
import _ from "lodash";
import SatelliteResponseInterface from '../utils/types/parialSatelliteInterface'
import { validateSatelliteIdRoute } from './../validators/satelliteIdValidator'
import { validateSatelliteNameRoute } from './../validators/satelliteNameValidator'
import { GetTwoLineElementsRequest, GetSatelliteByIdRequest, GetSatelliteByNameRequest } from './../utils/types/extendedRequestInterface'

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

router.get("/two-line-elements",
  validateSatelliteIdRoute,
  (req: GetTwoLineElementsRequest, res) => {
    n2yo
      .getTwoLineElements(req.query.id)
      .then((result) => res.json(result))
      .catch(() => res.sendStatus(400));
  });

router.get("/satellite/by-id",
  validateSatelliteIdRoute,
  (req: GetSatelliteByIdRequest, res) => {

    return SatelliteUtilities.getSatelliteById(req.query.id)
      .then((satelliteDoc) => {
        if (!satelliteDoc) return res.sendStatus(400);
        return res.json(_.pick(satelliteDoc, PROPS_TO_SEND_IN_RESPOSNE));
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  })

router.get("/satellite/by-name",
  validateSatelliteNameRoute,
  (req: GetSatelliteByNameRequest, res) => {
    return SatelliteUtilities.getSatelliteByName(req.query.name)
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
