const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");

const addVideo = catchAsync(async (req, res) => {
  const video = await videoService.addVideo(req.body);
  res.status(201).send(video);
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  res.send(video);
});

const changeViews = catchAsync(async (req, res) => {
  await videoService.changeViews(req.params.videoId);
  return res.status(204).send();
});

const changeVotes = catchAsync(async (req, res) => {
  const videoId = req.params.videoId;
  const { vote,change } = req.body;
  await videoService.changeVotes(videoId,vote,change);
  return res.status(204).send();
});

const getVideos = catchAsync(async (req, res) => {
  try{
    const title = req.query.title ? req.query.title:"";
    const contentRating = req.query.contentRating ? req.query.contentRating:"All";
    const genres = req.query.genres ? req.query.genres.split(","):["All"];
    const sortBy = req.query.sortBy ? req.query.sortBy:"releaseDate";

    const videos = await videoService.getVideos(title,contentRating,genres,sortBy);
    res.status(200).send({ "videos": videos });
  }catch(error){
    console.log(error)
  }
  
});

module.exports = {
    addVideo,
    getVideoById,
    getVideos,
    changeViews,
    changeVotes
};
