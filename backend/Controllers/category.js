const Category =  require("../Models/category");

exports.addCategory = (req, res) => {

    console.log("Aya")
    const newCategory = new Category({
        name: req.body.name,
        image: req.body.image
    });

    newCategory.save()
    .then(response=>{
        res.status(201).json({message:"Category Created Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Category Not Created", error:error, success:false})
    })
}

exports.getCategories = (req, res) => {

    Category.find({is_deleted:0})
    .then(response=>{
        res.status(200).json({message:"Categories Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Categories Not Fetched", error:error, success:false})
    })
}

exports.getCategoryById = (req, res) => {

    Category.findById(req.params.id)
    .then(response=>{
        res.status(200).json({message:"Category Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Category Not Fetched", error:error, success:false})
    })
}

exports.getCategoryByName = (req, res) => {

    Category.findOne({name: req.params.name})
    .then(response=>{
        res.status(200).json({message:"Category Fetched Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Category Not Found", error:error, success:false})
    })
}

exports.updateCategory = (req,res) => {

    const {id, name} = req.body;
    Category.findOneAndUpdate({_id:id}, {name:name})
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Category Name Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Category Not Updated", error:error, success:false})
    })
}

exports.deleteCategory = (req,res) => {

    const {id} = req.body;
    Category.findOneAndUpdate({_id:id}, {is_deleted:1})
    .then(response=>{
        res.status(200).json({message:"Category Deleted Successfully", data:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Category Not Deleted", error:error, success:false})
    })
}