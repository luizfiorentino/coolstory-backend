const { Router } = require("express");
const { sequelize } = require("../models");

const Space = require("../models").space;
const Story = require("../models").story;
const router = new Router();

router.get("/spaces", async (req, res, next) => {
  try {
    const allSpaces = await Space.findAll({ raw: true });
    res.json(allSpaces);
  } catch (e) {
    next(e);
  }
});

router.get("/spaces/:id", async (req, res, next) => {
  try {
    const spaceId = parseInt(req.params.id);

    const thisSpace = await Space.findByPk(spaceId, {
      order: [[Story, "createdAt", "DESC"]],
      include: [
        {
          model: Story,
        },
      ],
    });
    res.json(thisSpace);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
