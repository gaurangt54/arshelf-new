const Product = require('../Models/product')

exports.addProduct = async (req,res) => {
    const {name, category_id, description, quantity, dealer, price, dimension, eoq, arFile } = req.body;
    console.log(req.body)

    const newProduct = new Product({
        name: name,
        category_id: category_id,
        description: description,
        dimension: dimension,
        quantity: quantity,
        dealer: dealer,
        price: price,
        eoq: eoq,
        arFile: arFile
    });

    newProduct.save()
    .then(response=>{
        console.log(response)
        res.status(201).json({message:"Prdouct Added Successfully", data:response, success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Prdouct Not Added", error:error, success:false})
    })
    
}

exports.getProductById = (req, res) => {

    Product.findById(req.params.id)
    .then(response=>{
        res.status(200).json({message:"Product Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Product Not Fetched", error:error, success:false})
    })
}

exports.getProducts = (req, res) => {

    Product.find()
    .then(response=>{
        res.status(200).json({message:"Products Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Products Not Fetched", error:error, success:false})
    })
}