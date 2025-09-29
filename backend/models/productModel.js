const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter product name"],
        trim:true
    },
    description: {
        type: String,
        required: [true,"Please enter product description"],
    },
    price: {
        type: Number,
        required: [true,"Please enter product price"],
        maxLength: [8,"Cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
          public_id:{
            type: String,
            required: true
          },
          url:{
            type: String,
            required: true
         }
        } 
    ],
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: [true,"Please enter the stock number"],
        maxLength: [4,"Cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type: Number,
        defautl: 0
    },
    reviews:[
        {
          name:{
            type: String,
            required: true
          },
          rating:{
            type: Number,
            required: true
          },
          comment:{
            type: String,
            required:true
          }
      } 
   ],
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})
// creating model and exporting 
module.exports = mongoose.model("Product",productSchema);  
