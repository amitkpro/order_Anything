port =  4000 ;
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { User } = require("./models/user.js");
const {DeliveryPerson } = require("./models/user.js");
const {  Admin } = require("./models/user.js");
const Product = require("./models/products.js");
const { Order } = require("./models/order.js");
const Ordered = require("./models/ordered.js");
require("./connection/conn.js");


app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("/login" ,async(req, res)=>{
try {
  var {phone ,password} = req.body;
   const user = await User.findOne({phone:phone}) || await DeliveryPerson.findOne({phone:phone}) || await Admin.findOne({phone:phone});
   if(user.password  == password)
   {
   if(user.userCategory == 'admin'){
     res.json({
       message:"admin"
     })
   } else if(user.userCategory == 'user'){
     res.json({
       message:"user"
     })
   } else {
     res.json({
       message:"Something went wrong"
     })
   }
 } else {
   res.json({
     message:"wrong Password"
   })
 }
} catch (e) {
  res.json({
    message:e
  })
}

})
app.get("/signup", (req , res)=>{
  res.json({
    message:"welcome"
  })
})
app.post("/signup",async(req,res)=>{
  var {name , phone , password , userCategory} = req.body;
  try {

    if(userCategory == 'admin'){
          const registerAdmin = new Admin(req.body);
          const registeredAdmin = await registerAdmin.save();
          // res.status(201).json({
          //   user:registeredAdmin
          // })
    } else if( userCategory == 'user'){
          const registerUser = new User(req.body);
          const registeredUser = await registerUser.save();
          // res.status(201).json({
          //   user:registeredUser
          // })
    } else if(userCategory == 'delivery') {
          const registerDelivery = new DeliveryPerson(req.body);
          const registeredDelivery = await registerDelivery.save();
          // res.status(201).json({
          //   user:registeredDelivery
          // })

    } else {
      res.status(400).json({
        error:"please pass a valid user type"
      })
    }
  //  const registeredUser = await registerUser.save();
    res.status(201).json({
      message:"Successfully Created"
    })

  } catch (e) {
    res.json({
      message:e
    })
  }

});
// add Product
app.post("/products", async (req, res) => {
  try {
    // console.log(req.body);
    const prod = await new Product(req.body);
    await prod.save();
    res.status(201).send(prod);
  } catch (error) {
    res.status(400).send(error);
  }
});

// get by ID:
app.get("/products/:id?", async (req, res) => {
  try {
    if (!req.params.id) {
      const products = await Product.find({});
      res.status(200).send(products);
   } else if (req.params.id) {
      const product = await Product.findById(req.params.id);
      res.status(200).json({
        product:product
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
//add to cart
app.post("/addtocart/:productid/:quantity", async (req, res) => {
  try {
    const prod = await Product.findById(req.params.productid);
    console.log(req.params.productid ,req.params.quantity);
    const cart = await new Order({
     owner: "613cf3d95377f59428c43a7f" ,     //req.user._id,
      product: prod._id,
      quantity: req.params.quantity,
    });
    await cart.save();
    res.status(201).json({
      cart: cart
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
// get cart
app.get("/cart/:userId", async (req, res) => {
  try {
    // const prod = await Order.find().populate("product").populate("owner");
  //  const prod = await Order.find().populate("product").populate("613cf3d95377f59428c43a7f");
    const prod = await Order.find({owner:req.params.userId})
    res.status(201).send(prod);
  } catch (error) {
    res.status(400).send(error);
  }
});
//remove product from cart
app.delete("/deletecart/:orderid", async (req, res) => {
  try {
    const prod = await Order.findByIdAndDelete(req.params.orderid);
    res.status(200).json({ message: "Product Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});
//update quantity
app.put("/updatecart/:orderid/:quantity", async (req, res) => {
  try {
    const updateorder = await Order.findByIdAndUpdate(req.params.orderid, {
      quantity: req.params.quantity,
    });
    res.status(201).json({ message: "Order Updated" });
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/placeOrder" , async  (req , res) => {
      try {
          const placeOrders = await Ordered.find();
          res.status(200).json({
            messsage: placeOrders
          })
      } catch (e) {
        res.status(404).json({
          error:e
        });
      }

})

//Place order
app.post("/placeOrder/:userid" , async (req , res) => {
    try {
      const allCartProduct = await Order.find({owner:req.params.userid});
      const ordered = await new Ordered({
        ordered: allCartProduct,
        status: "Created"
      });
      await ordered.save();
    try {
    //  console.log(req.params.id);
      const deletedCart =  await Order.deleteMany({owner : req.params.userid});
      console.log(deletedCart);
} catch (e) {
   console.log(e);
}
    //  console.log(deletedCart);
      res.status(201).json({
        ordered: ordered
      });

    } catch (e) {
          res.status(404).json({
            error:e
          });
    }
  })
  // update status
  app.put("/placeOrder/:orderedid/:status", async (req, res) => {
    try {
      const updateorder = await Ordered.findByIdAndUpdate(req.params.orderedid,  {
        status: req.params.status
      });
      res.status(201).json({ message: "Order status updated" });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  // assign delivery person
  app.put("/assginOrder/:orderedId/:deliveryPersonId", async (req, res) => {
    try {
      const assginOrders = await Ordered.findByIdAndUpdate(req.params.orderedId, {
        assignedDelivery: req.params.deliveryPersonId,
      });
        try {
            const updateorder = await DeliveryPerson.findByIdAndUpdate(req.params.deliveryPersonId, {
              assignedDelivery: req.params.orderedId,
            });
            // console.log(updateorder);
            // console.log("_______________________________________________");
            // console.log(assginOrders );
            res.status(201).json({ message: "Order assigned" });
          } catch (error) {
            res.status(400).send(error);
          }
    } catch (error) {
      res.status(400).send(error);
    }

  });
// list of delivery partnars

app.get("/DeliveryPerson/:id" , async  (req , res) => {
      try {
          const deliveryPersons = await DeliveryPerson.findById(req.params.id);
          res.status(200).json({
            messsage: deliveryPersons.assignedDelivery
          })
      } catch (e) {
        res.status(404).json({
          error:e
        });
      }

})
app.listen(port,()=>{
  console.log(`server started at ${port}`);
})
