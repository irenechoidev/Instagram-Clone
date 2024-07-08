const { BAD_REQUEST, OK_STATUS_CODE } = require('../commons/constants');
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
      successulf: false,
      follow,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};
