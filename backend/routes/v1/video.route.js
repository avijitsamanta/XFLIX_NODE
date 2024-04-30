const express = require("express");
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation");
const videoController = require("../../controllers/video.controller");

const router = express.Router();

router.post("/",videoController.addVideo);

router.get("/", videoController.getVideos);
router.get(
  "/:videoId",
  validate(videoValidation.getVideo),
  videoController.getVideoById
);
router.patch(
  "/:videoId/views",
  validate(videoValidation.getVideo),
  videoController.changeViews
);

router.patch(
  "/:videoId/votes",
  validate(videoValidation.patchVideoVotes),
  videoController.changeVotes
);

module.exports = router;