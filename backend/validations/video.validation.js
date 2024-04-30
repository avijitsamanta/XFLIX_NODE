const Joi = require("joi");

const utils = require("../utils/videoUtils")
const { objectId } = require("./custom.validation");

const getVideo = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
};

const addVideo = {
  body: Joi.object().keys({
      videoLink: Joi.string().required().regex(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/),
        genre: Joi.string().required().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"),
        contentRating: Joi.string().required().valid(...utils.contentRating, "All"),
        title: Joi.string().required(),
        previewImage: Joi.string().required(),
        releaseDate: Joi.string().required()
  }),
};

const patchVideoVotes = {
  params: Joi.object().keys({
    videoId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    vote: Joi.string().valid("upVote", "downVote").required(),
    change: Joi.string().valid("increase", "decrease").required(),
  }),
};

module.exports = {
    addVideo,
    getVideo,
    patchVideoVotes
};
