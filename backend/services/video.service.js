const httpStatus = require("http-status");
const mongoose = require("mongoose");
const {Video} = require("../models/video.model");
const ApiError = require("../utils/ApiError");
const genres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle"];


/**
 * Get Product by id
 * @param {ObjectId} id
 * @returns {Promise<Video>}
 */
const getVideoById = async (id) => {
  const video = await Video.findById(id);
  if(!video){
    throw new ApiError(httpStatus.NOT_FOUND,"No video found with matching id")
  }
  return video
};

const getPossibleContentRatings = (contentRating)=>{
  const contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
  if(contentRating == "All"){
    return contentRatings;
  }
  const contentRatingIndex = contentRatings.indexOf(contentRating)
  //const getPossibleContentRatings = contentRatings.splice(0,contentRatingIndex+1);
  const getPossibleContentRatings = contentRatings[contentRatingIndex];
  return getPossibleContentRatings;
}

const sortVideos = (videos,sortBy)=>{
  videos.sort((video1, video2) => {
   // console.log(video1)
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];
    // Convert releaseDate strings to comparable numbers
    if (sortBy == "releaseDate") {
      field1 = new Date(field1);
      field2 = new Date(field2);
    }
  
    if (field1 > field2) {
      return -1; // video1 should come before video2
    } else if (field1 < field2) {
      return 1; // video1 should come after video2
    } else {
      return 0; // field1 and field2 are equal
    }
  });
  return videos;
}

/**
 * Fetch all products
 * @returns {Promise<List<Videos>>}
 */
const getVideos = async (title,contentRating,genres,sortBy) => {
  const titleMatch = {title:{$regex:title,$options:"i"}}
  const contentRatings = getPossibleContentRatings(contentRating)
  console.log(contentRatings)
  const contentRatingMatch = {contentRating:{$in:contentRatings}}
  let genreMatch = {genre:{$in:genres}}

  if(genres.includes("All")){
    genreMatch = null 
  }

  const videos = await Video.find({
    ...titleMatch,
    ...contentRatingMatch,
    ...genreMatch,
    // limit:25,
    // skipp:1
  });
  // console.log(videos)
  // return videos;
  const sortedVideos = sortVideos(videos,sortBy)
  return sortedVideos;
 
};



const changeViews = async (videoId) => {
  const video = await getVideoById(videoId)
  video.viewCount +=1;
  await video.save() 
  return;
}

const changeVotes = async (videoId,voteType,changeType) => {
  const video = await getVideoById(videoId)
  let changeVoteType; 
  if(voteType == "upVote"){
    changeVoteType = "upVotes"
  }else{
    changeVoteType = "downVotes"
  }
  const preVotes = video.votes[changeVoteType];
  console.log(preVotes)
  let newVotes = preVotes;
  if(changeType == "increase"){
    newVotes += 1;
  }else{
    newVotes -= 1;
  }
  newVotes = Math.max(newVotes,0)
  console.log(newVotes)
  video.votes[changeVoteType] = newVotes;
  await video.save() 
  return;
}

const addVideo = async(data) => {
  const video = await Video.create({...data}).catch((error)=>{
    if(mongoose.Error.ValidationError){
      throw new ApiError(httpStatus.BAD_REQUEST,'Video Link already exist')
    }
  });

  return video
}

module.exports = {
    getVideoById,
    getVideos,
    addVideo,
    changeViews,
    changeVotes
};
