const mongoose=require('mongoose');


const FeaturedProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  featuredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  featuredAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date // optional: auto-remove after a period
  }
});

module.exports = mongoose.model("FeaturedProduct", FeaturedProductSchema);
