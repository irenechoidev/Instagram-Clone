const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
} = require('../commons/constants');
const Follow = require('../models/follow');

exports.createFollow = async (req, res) => {
  let follow = null;

  try {
    follow = await Follow.create({
      owner: req.body.owner,
      following: req.body.following,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      successful: false,
      follow,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};

exports.listFollowers = async (req, res) => {
  const { username } = req.params;

  const followers = await Follow.find({ owner: username });
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    followers,
  });
};

exports.deleteFollow = async (req, res) => {
  const { id } = req.params;
  const follow = await Follow.findOne({ _id: id });

  if (!follow) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      follow,
    });
  }
  await Follow.deleteOne({ _id: id });
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};
