const mongoose = require('mongoose');

const uiUxDesignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Design title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Design category is required'],
      default: 'UI/UX Design'
    },
    client: {
      type: String,
      default: 'GDGC on Campus SVIET'
    },
    description: {
      type: String,
      required: [true, 'Design description is required']
    },
    image: {
      type: String,
      required: [true, 'Design cover image is required']
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    figmaUrl: {
      type: String,
      default: ''
    },
    driveUrl: {
      type: String,
      default: 'https://drive.google.com/drive/folders/1IElIpRNSVNimPxaBEPnocSWhCwZX1ahK?usp=drive_link'
    },
    featured: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('UiUxDesign', uiUxDesignSchema);
