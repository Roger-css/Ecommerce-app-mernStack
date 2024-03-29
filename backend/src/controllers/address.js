const address = require("../models/address")
const UserAddress = require("../models/address")

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  try {
    const { address } = req.body
    if (address) {
      if (address._id) {
        UserAddress.findOneAndUpdate(
          { user: req.id, "address._id": address._id },
          {
            $set: {
              "address.$": address,
            },
          }
        ).exec((error, address) => {
          if (error) return res.status(400).json({ error })
          if (address) {
            res.status(201).json({ address })
          }
        })
      } else {
        UserAddress.findOneAndUpdate(
          { user: req.id },
          {
            $push: {
              address: address,
            },
          },
          { new: true, upsert: true }
        ).exec((error, address) => {
          if (error) return res.status(400).json({ error })
          if (address) {
            res.status(201).json({ address })
          }
        })
      }
    } else {
      res.status(400).json({ error: "Params address required" })
    }
  } catch (error) {
    console.log(error)
  }
}

exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error })
    if (userAddress) {
      res.status(200).json({ userAddress })
    }
  })
}
