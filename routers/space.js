const { Router } = require("express");

const Space = require("../models").space;
const router = new Router();

router.get("/spaces", async (req, res, next) => {
  try {
    const allSpaces = await Space.findAll({ raw: true });
    res.json(allSpaces);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
