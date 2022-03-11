const Order = require('../Models/order')
const User = require('../Models/user')
const Product = require('../Models/product')

exports.createOrder = async (req,res) => {
    const {user, deliveryAddress, payment} = req.body;
    const cart = user.cart;

    await cart.map(async(product)=>{
        const order = new Order({
            userEmail:user.email,
            userName: user.name,
            userPhone: user.phoneNumber,
            product:product,
            quantity: product.quantity,
            deliveryAddress: deliveryAddress,
            payment: payment,
            date: new Date()
        })

        await order.save()
        .then(response=>{
            console.log(`Order Added of ${product.name}`)
        })
        .catch(error=>{
            console.log(error)
            res.status(500)
        })

        await Product.findOneAndUpdate({_id:product.id}, {$inc:{quantity: (-1 * product.quantity)}})
        .then(response=>{
            console.log(`${product.name} Quantity changed`)
        })
        .catch(error=>{
            console.log(error)
            res.status(500)
        })
    })

    await User.findOneAndUpdate({email:user.email}, {cart:[]})
    .then(response=>{
        console.log("Cart Empty")
        res.status(200).json({message:"Order Placed Succesfully", success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500)
    })



}

exports.getOrders = (req,res) => {

    const {userEmail, status, date, product, payment} = req.body;
    let payload = {}

    userEmail ? payload['userEmail'] = userEmail : null;
    date ? payload['date'] = date : null;
    status ? payload['status'] = status : null;

    const sort = req.body.sort ? req.body.sort : -1;
    const page = req.body.page ? req.body.page : 1;
    const perPage = req.body.perPage ? req.body.perPage : 5;
    
    const startIndex = (page-1)*perPage;
    const endIndex = (page*perPage);

    Order.find(payload).sort({date:sort})
    .then(response=>{

        let pages = [];
        for(let i = 1; i<=Math.ceil(response.length/perPage);i++){
            pages.push(i);
        }

        page ? rest = response.slice(startIndex,endIndex): rest = response;


        res.status(200).json({message:"Orders Fetched Successfully", orders:rest, pages:pages, page:page, total:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Orders Not Fetched", error:error, success:false})
    })
}

exports.updateOrder = (req, res) =>{
    const {id, status} = req.body;
    Order.findOneAndUpdate({_id:id}, {status:status})
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Order Status Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Order Not Updated", error:error, success:false})
    })
}