import express from "express";
import heroController from "../controllers/heroController.js";

const router = express.Router();

/**
 * @route  /api/v1/heros
 */

router.post("/:id", heroController.createHeroBanner);
router.delete("/:id", heroController.deleteHeroBanner);
router.get('/', heroController.getAllHeroProduct);
router.patch('/:id', heroController.getUpdateHeroProd);
router.delete('/', heroController.deleteAllHeroProducts);

export default router;
