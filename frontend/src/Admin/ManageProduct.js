/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { faEdit,faTrash,faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Button, Table} from 'react-bootstrap';
import apiCall from '../Utils/apiCall'; 

function ManageProduct(props) {

    const [categories, setCategories] = useState();
    const [products, getProducts] = useState();
    const [payload, setPayload] = useState({});
    const [pages, setPages] = useState();
    const [page, setPage] = useState();
    const [total, setTotal] = useState();

    const [deleteProduct, setDeleteProduct] = useState();

    useEffect(()=>{

        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            const data = res.data;
            const categories = {};
            for(let i =0; i< data.data.length; i++){
                const id = data.data[i]._id;
                const name = data.data[i].name
                categories[id] = name;
            };
            setCategories(categories);
        }).catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
        });
    }, [])

    useEffect(()=>{
        apiCall(`getProducts`, "POST", null, payload)
        .then((res) => {
            getProducts(res.data.products);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, [payload])

    const paging = (page) => {
        let p = payload;
        p['page'] = page;
        setPayload(p)

        apiCall(`getProducts`, "POST", null, payload)
        .then((res) => {
            getProducts(res.data.products);
            setPages(res.data.pages)
            setPage(res.data.page)
            setTotal(res.data.total)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }

    const deleteIt = () => {
        apiCall(`deleteProduct`, 'DELETE', null, {id: deleteProduct._id})
        .then(res=>{
            alert(res.data.message);
            setDeleteProduct()
            window.location.reload()
        })
        .catch(err=>{
            alert("Something went wrong");
        })
    }

    return <div>
        <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem", minHeight:"88vh"}}>
            <div className="text-center">
                {deleteProduct?
                    <div className="mb-3 p-3" style={{backgroundColor:"#ffcfcf", textAlign:"center"}}>
                            Do you want to delete Product <u>{deleteProduct.name}</u> ? 
                            <Button className="bg-primary" type="button" onClick={deleteIt}>Delete</Button>
                            <Button className="bg-danger" type="button" onClick={()=>{setDeleteProduct()}}>Cancel</Button> 
                </div>:null}
                <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Products</div>
                {
                    categories && products && products.length!==0?
                    <Table striped hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                            <th className="p-3">Sr. No.</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">EOQ</th>
                            <th className="p-3">Actions</th>
                        </thead>
                        <tbody>
                            {products.map((product, index)=>(
                                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                                    <td className="p-3">{(page-1)*12+index+1}</td>
                                    <td className="p-3">{categories[product.category_id]}</td>
                                    <td className="p-3">{product.name}</td>
                                    <td className="p-3">&#8377; {product.price}</td>
                                    <td className="p-3">{product.quantity}</td>
                                    <td className='p-3'>{product.eoq}</td>
                                    <td className="p-3"> 
                                        <FontAwesomeIcon className="mx-3" icon={faEdit} onClick={()=>{props.history.push(`/admin/updateProduct/${product._id}`)}} style={{fontSize:"18px"}} />
                                        <FontAwesomeIcon className="mx-3" icon={faTrash} onClick={()=>{setDeleteProduct(product)}} style={{fontSize:"18px"}} /> 
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>:<p>Loading...</p>}
            </div>
        </Container>

        <Row className="mb-5">
            {pages && total && pages.length!==0 ?
            <>
            <div className="pagination">
                <button className={page===1?"pageDisabled":"pageNo"} onClick={()=>paging(page-1)} disabled={page===1?true:false}>&#60;</button>
                    {pages.map((i) => {
                        return <button className={page===i?"pageActive":"pageNo"} onClick={()=>paging(i)}>{i}</button>
                    })}
                <button className={page===pages.length?"pageDisabled":"pageNo"} onClick={()=>paging(page+1)} disabled={page===pages.length?true:false}>&#62;</button>
            </div>

            <div className=" my-2 text-center text-gray-600">
                Showing {(page-1)*12+1} - {page===pages.length?total.length:page*12} out of {total.length} Products
            </div>
            </> : null}
        </Row>

    </div>;
}

export default ManageProduct;
