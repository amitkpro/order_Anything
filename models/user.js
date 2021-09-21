const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type: String,
        required: [true,"Please Enter the Name"],
    },
      phone:{
        type: String,
        required: [true,"Please Enter the Phone Number"],
        unique:true
    },
    password:{
        type: String,
        required: [true,"Please Enter the Password "],
    },
    userCategory:{
        type: String,
        required: [true,"Please Enter the admin or user or delivery Person"]
    },
    assignedDelivery:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ordered"
    }],
    addresses: [
    {
      fulladdress: {
        type: String
      },
      Pincode: {
        type: Number
      }
    },
  ]
});
const Admin = mongoose.model("Admin",userSchema);
const DeliveryPerson = mongoose.model("DeliveryPerson",userSchema);
const User = mongoose.model("User",userSchema);
module.exports ={ User, DeliveryPerson, Admin};
