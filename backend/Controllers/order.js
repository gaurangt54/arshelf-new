const Order = require('../Models/order')
const User = require('../Models/user')
const Product = require('../Models/product')
const Approval = require('../Models/approval')
const {mail} = require('./export')

exports.createOrder = async (req,res) => {
    const {user, deliveryAddress, payment} = req.body;
    const cart = user.cart;

    const subject = "Order Placed Sucessfully";
    const to = `parekhkinjal16@gmail.com, gaurang.thakkar1997@gmail.com, ${user.email} `;
    let html = ""
    let total = 0;

    html += "<div> <table border='1' cellpadding='4' style='border:1px solid black; border-collapse: collapse; text-align:left;'>"
    html += " <tr> <th>Name</th>  <th>Qty</th> <th>Price</th> <th>Subtotal</th> </tr>"

    await cart.map(async(product)=>{
        const order = new Order({
            userEmail:user.email,
            userName: user.name,
            userPhone: user.phoneNumber,
            product:product,
            quantity: product.quantity,
            customization:product.customization ? product.customization : null,
            approvalId: product.approvalId ? product.approvalId : null,
            deliveryAddress: deliveryAddress,
            payment: payment,
            date: new Date()
        })

        html += `<tr> <td>${product.name}</td> <td>${product.quantity}</td> <td>${product.price}</td> <td>${product.quantity*product.price}</td> </tr>`

        total += product.quantity*product.price

        await order.save()
        .then(response=>{
            console.log(`Order Added of ${product.name}`)
        })
        .catch(error=>{
            console.log(error)
            res.status(500)
        })

        if(product.approvalId){
            await Approval.findOneAndUpdate({_id:product.approvalId}, {status:"Ordered"})
            .then(response=>{
                console.log("Approval Status Changed")
            })
            .catch(error=>{
                console.log(error)
                res.status(500)
            })
        }
        

        await Product.findOneAndUpdate({_id:product.id}, {$inc:{quantity: (-1 * product.quantity)}})
        .then(response=>{
            console.log(`${product.name} Quantity changed`)
        })
        .catch(error=>{
            console.log(error)
            res.status(500)
        })
    })

    html += "</table> <br>"
    html += `<h3> Total Amount: <b> ₹ ${total} </b></h3>`
    html += `<h4> Payment Method: <b> ${payment} </b></h4>`
    html += "</div>"

    await mail(to, subject, null, html, null)

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

exports.updateOrder = async (req, res) =>{
    const {order, status} = req.body;

    if(status === "Cancelled"){
        await Product.findOneAndUpdate({_id:order.product.id}, {$inc:{quantity: (1 * order.product.quantity)}})
        .then(response=>{
            console.log(`${order.product.name} Quantity changed`)
        })
        .catch(error=>{
            console.log(error)
            res.status(500)
        })
    }

    const to = order.userEmail
    const subject = `Order has been ${status}`
    let html = ""
    html += `Your order of ${order.product.quantity} x ${order.product.name} is ${status}`

    await mail(to, subject, null, html, null)

    Order.findOneAndUpdate({_id:order._id}, {status:status})
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Order Status Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Order Not Updated", error:error, success:false})
    })
}