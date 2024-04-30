const mongoose = require("mongoose");
//const videoRegExp = /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+$/; 
const contentRatings = ["Anyone", "7+", "12+", "16+", "18+"];
const genres = ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"];
const validator = require("mongoose-unique-validator")

const videoSchema = mongoose.Schema({
      videoLink: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        // validation(value){
        //   if(!videoRegExp.test(value)){
        //     throw new Error('Please add a valid video link')
        //   }
        // }
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      genre: {
        type: String,
        required:true,
        trim:true,
        validate(value){
          if(!genres.includes(value)){
            throw new Error('Invalid genre')
          }
        }
      },
      contentRating: {
        type: String,
        required:true,
        trim:true,
        validate(value){
          if(!contentRatings.includes(value)){
            throw new Error('Invalid content rating')
          }
        }
        
      },
      releaseDate: {
        type: Date,
        default:Date.now(),
        required:true,
        trim:true
      },
      previewImage: {
        type: String,
        trim:true,
        default:"https://i.ytimg.com/vi_webp/hGrRg8aoBMU/sddefault.webp"
      },
      votes: {
        upVotes: {
          type: Number,
          default: 0,
        },
        downVotes: {
          type: Number,
          default: 0,
        },
      },
      viewCount: {
        type: Number,
        default: 0,
      }

})

videoSchema.plugin(validator,{message:"must be unique!"})

const Video = mongoose.model("Video",videoSchema)

module.exports.Video = Video;