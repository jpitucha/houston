import express from "express";
import n2yo from "./../api/n2yo/index.js";
import SatelliteUtilities from "../utils/satelliteUtils";
import _ from "lodash";
import SatelliteInterface from "../utils/types/satelliteInterface.js";
import { object, number, string, assert } from "superstruct";
import { Range } from '../utils/types/rangeType'

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

router.get("/two-line-elements/:id", (req, res) => {
  if (req.params.id === undefined) return res.sendStatus(400);
  n2yo
    .getTwoLineElements(req.params.id)
    .then((result) => res.json(result))
    .catch(() => res.sendStatus(400));
});

router.get("/satellite", (req, res) => {
  if (typeof req.query.id === "string") {
    return SatelliteUtilities.getSatelliteById(req.query.id)
      .then((satelliteDoc) => {
        if (!satelliteDoc) return res.sendStatus(400);
        return res.json(_.pick(satelliteDoc, PROPS_TO_SEND_IN_RESPOSNE));
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  }
  if (typeof req.query.name === "string") {
    return SatelliteUtilities.getSatelliteByName(req.query.name)
      .then((satelliteDoc) => {
        if (!satelliteDoc) return res.sendStatus(400);
        const satellitesArray = <Partial<SatelliteInterface>[]>(
          satelliteDoc.map((satellite) =>
            _.pick(satellite, PROPS_TO_SEND_IN_RESPOSNE)
          )
        );
        return res.json(satellitesArray);
      })
      .catch(() => {
        return res.sendStatus(400);
      });
  }
  res.sendStatus(400);
});

router.get("/satellite-with-range", async (req, res) => {
  const rangeSchema = object({
    xstart: number(),
    ystart: number(),
    xend: number(),
    yend: number(),
  });

  const input = req.query;
  try {
    assert(input, object({
      xstart: string(),
      ystart: string(),
      xend: string(),
      yend: string(),
    }));
    assert({
      xstart: parseInt(input.xstart),
      ystart: parseInt(input.ystart),
      xend: parseInt(input.xend),
      yend: parseInt(input.yend),
    }, rangeSchema);
  } catch {
    return res.sendStatus(400);
  }

  const range: Range = {
    xStart: parseInt(input.xstart),
    yStart: parseInt(input.ystart),
    xEnd: parseInt(input.xend),
    yEnd: parseInt(input.yend)
  }

  const selectedSatellites = await SatelliteUtilities.getSatellitesByRange(range);
  if (_.isEmpty(selectedSatellites)) return res.sendStatus(400);
  const satellitesArray = <Partial<SatelliteInterface>[]>(
    selectedSatellites.map((satellite) =>
      _.pick(satellite, PROPS_TO_SEND_IN_RESPOSNE)
    )
  );
  return res.json(satellitesArray);
});

export default router;
