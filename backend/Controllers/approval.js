const Approval = require('../Models/approval')
const User = require('../Models/user')
const Product = require('../Models/product')

exports.addCustomizationRequest = (req, res) => {
    const {user, product, customization} = req.body;

    const request = new Approval({
        userEmail:user.email,
        userName: user.name,
        userPhone: user.phoneNumber,
        product: product,
        customization: customization,
        date: new Date()
    })

    request.save()
    .then(response=>{
        console.log(`Customization Reuqest sent`)
        res.status(200).json({message:"Customization Reuqest sent", success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500)
    })
}

exports.getCustomizationRequests = (req,res) => {

    const {userEmail, status, date, product} = req.body;
    let payload = {}

    userEmail ? payload['userEmail'] = userEmail : null;
    date ? payload['date'] = date : null;
    status ? payload['status'] = status : null;

    const sort = req.body.sort ? req.body.sort : -1;
    const page = req.body.page ? req.body.page : 1;
    const perPage = req.body.perPage ? req.body.perPage : 5;
    
    const startIndex = (page-1)*perPage;
    const endIndex = (page*perPage);

    Approval.find(payload).sort({date:sort})
    .then(response=>{

        let pages = [];
        for(let i = 1; i<=Math.ceil(response.length/perPage);i++){
            pages.push(i);
        }

        page ? rest = response.slice(startIndex,endIndex): rest = response;


        res.status(200).json({message:"Customization Requests Fetched Successfully", approvals:rest, pages:pages, page:page, total:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Customization Requests  Not Fetched", error:error, success:false})
    })
}

exports.updateCustomizationRequest = async (req, res) =>{
    const {approval, status} = req.body;

    Approval.findOneAndUpdate({_id:approval._id}, {status:status})
    .then(response=>{
        console.log(response)
        res.status(200).json({message:"Customization Request Updated Successfully", data:response, success:true})
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({message:"Customization Request Not Updated", error:error, success:false})
    })
}

exports.getCustomizationRequest = (req, res) => {
    const {id} = req.body;

    Approval.findOne({_id:id})
    .then(response=>{
        res.status(200).json({message:"Customization Request Fetched Successfully", approval:response, success:true})
    })
    .catch(error=>{
        res.status(500).json({message:"Customization Request Not Fetched", error:error, success:false})
    })

}

