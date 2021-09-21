const mongoose = require("mongoose");
const {orderSchema} = require("./order.js");
const Schema = mongoose.Schema;
const orderedSchema = Schema(
  {

    ordered: [{
      type:orderSchema,
      required: true
    }],
    status:{
      type:String,
    },
    assignedDelivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryPerson"
    }

  },
  {
    timestamps: true,
  }
);
const Ordered = mongoose.model("Ordered", orderedSchema);
module.exports = Ordered;
