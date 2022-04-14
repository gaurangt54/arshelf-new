const Product = require('../Models/product')

const axios = require('axios');

const regex = (value) => {
    const p = {
        $regex: value,
        $options: "i",
    }
    return p;
}

const setDate = (date1) => {
    var date;
    date1? date = new Date(date1) : date = new Date()
    let fullMonth = date.getMonth()+1;

    let fullDate = [
        `${digit(date.getDate())}-${digit(fullMonth)}-${date.getFullYear()}`,
        `${digit(date.getHours())}:${digit(date.getMinutes())}:${digit(date.getSeconds())}`
    ];
    return fullDate
}

const digit = (time) => {
    if(time<10) 
        return( `0${time}`);  
    return (`${time}`);
}

exports.addReview = async (req,res) => {
    const review = req.body;
    review['date'] = setDate()[0];
    console.log(review)
    Product.findOneAndUpdate({_id:review.productId}, {$push:{reviews:review}})
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Product Review Added Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Product Not Updated", error:error, success:false})
    })

}

exports.addProduct = async (req,res) => {
    const {name, category_id, description, quantity, price, length, breadth, height, eoq, arFile } = req.body;
    console.log(req.body)

    const newProduct = new Product({
        name: name,
        category_id: category_id,
        description: description,
        length: length,
        breadth: breadth,
        height: height,
        quantity: quantity,
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

exports.updateProduct = (req, res) => {
    const {_id, category_id, name, length, height, breadth, quantity, eoq, price, arFile, reviews} = req.body
    console.log(req.body)
    let payload = {}

    category_id ? payload['category_id'] = category_id : null;
    name ? payload['name'] = name : null;
    length ? payload['length'] = length : null;
    breadth ? payload['breadth'] = breadth : null;
    height ? payload['height'] = height : null;
    quantity ? payload['quantity'] = quantity : null;
    eoq ? payload['eoq'] = eoq : null;
    price ? payload['price'] = price : null;
    arFile ? payload['arFile'] = arFile : null;
    reviews ? payload['reviews'] = reviews : null;
    
    Product.findOneAndUpdate({_id:_id}, payload)
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Product Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Product Not Updated", error:error, success:false})
    })

}

exports.deleteProduct = (req,res) => {

    const {id} = req.body;
    console.log(id)
    Product.findOneAndUpdate({_id:id}, {is_deleted:1})
    .then(response=>{
        res.status(200).json({message:"Product Deleted Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Product Not Deleted", error:error, success:false})
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

    const {category_id, name, length, height, breadth, quantity, eoq, price, lcost, hcost, wishlist} = req.body
    let sorting = {1:{name:1}, 2:{price:1}, 3:{price:-1}}
    
    let payload = {is_deleted:0}

    wishlist ? payload['_id'] = {$in: wishlist} : null;
    category_id ? payload['category_id'] = category_id : null;
    name ? payload['name'] = regex(name) : null;
    length ? payload['length'] = {$lte:length} : null;
    breadth ? payload['breadth'] = {$lte:breadth} : null;
    height ? payload['height'] = {$lte:height} : null;
    lcost && hcost ? payload['price'] = {$lte:hcost, $gte:lcost} : null;

    const sort = req.body.sort ? sorting[req.body.sort] : {name:1};
    console.log(req.body.sort)

    const page = req.body.page ? req.body.page : 1;
    const perPage = req.body.perPage ? req.body.perPage : 12;
    
    const startIndex = (page-1)*perPage;
    const endIndex = (page*perPage);

    console.log(payload)

    Product.find(payload).sort(sort)
    .then(response=>{

        let pages = [];
        for(let i = 1; i<=Math.ceil(response.length/perPage);i++){
            pages.push(i);
        }

        page ? rest = response.slice(startIndex,endIndex): rest = response;

        res.status(200).json({message:"Products Fetched Successfully", products:rest, pages:pages, page:page, total:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Products Not Fetched", error:error, success:false})
    })
}

exports.getRecommendedProducts = async (req, res) => {
    const {product} = req.body;

    let p = await axios({
        url: 'https://protected-gorge-70490.herokuapp.com/recommendation',
        method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": "*",
            'Content-type': 'application/json',
        },
        data: {product: product},
    })
    .then(response=>{ 
        return response.data.result
        //console.log(response)
    })
    .catch(error=>{ 
        console.log(error)
    })
    
    await Product.find({name:{$in:p}}).limit(3)
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Prdouct Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Prdouct Not Fetched", error:error, success:false})
    })

}

exports.getR = (req, res) => {
    const {product} = req.body;
    console.log("recevied")
    



}