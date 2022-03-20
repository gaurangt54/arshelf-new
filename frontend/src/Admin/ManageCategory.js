/* eslint-disable */
import React, {useState, useEffect} from 'react'
import { faEdit,faTrash,faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Button, Table} from 'react-bootstrap';
import apiCall from '../Utils/apiCall'; 

function ManageCategory(props) {

    const [categories, setCategories] = useState();
    const [updateCategory, setUpdateCategory] = useState();
    const [deleteCategory, setDeleteCategory] = useState();
    const [categoryImage, setCategoryImage] = useState();

    useEffect(()=>{

        apiCall(`getCategories`, 'GET', null)
        .then(res=>{
            const data = res.data;
            const categories = [];
            for(let i =0; i< data.data.length; i++){
              categories.push({
                id: data.data[i]._id,
                name:data.data[i].name
              });
            };
            setCategories(categories);
          }).catch(err => {
            console.log(err);
            alert("Something went wrong, please try again!");
          });

    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [updateCategory])

    const update = () => {
        const newCategory = {id: updateCategory.id, image: categoryImage}
        apiCall(`updateCategory`, 'PUT', null, newCategory)
        .then(res=>{
            alert(res.data.message);
            setUpdateCategory()
            window.location.reload()
        })
        .catch(err=>{
            alert(err.data.message);
        })
    } 

    const deleteIt = () => {
        apiCall(`deleteCategory`, 'DELETE', null, {id: deleteCategory.id})
        .then(res=>{
            alert(res.data.message);
            setDeleteCategory()
            window.location.reload()
        })
        .catch(err=>{
            alert(err.data.message);
        })
    }

    return (
        <div>
            <Container fluid style={{backgroundColor:"#fafafa", padding:"1rem 4rem 3rem 4rem", minHeight:"88vh"}}>
              <div className="text-center">
                <div className="p-4" style={{fontWeight:"bold", fontSize:"40px"}}>Categories</div>

                    {updateCategory?
                        <div className="mb-3 p-3" style={{backgroundColor:"#cfdee3", textAlign:"center"}}>
                            <form className="form-inline">
                                Do you want to update Category Image of {updateCategory.name} ? 
                                <input className="form-control mx-3" type="text" placeholder="Image Link" onChange={(e)=>{setCategoryImage(e.target.value)}} />
                                <Button className="bg-primary" type="button" onClick={update}>Update</Button>
                                <Button className="bg-danger" type="button" onClick={()=>{setUpdateCategory()}}>Cancel</Button> 
                            </form>
                        
                    </div>:null}
                    {deleteCategory?
                        <div className="mb-3 p-3" style={{backgroundColor:"#ffcfcf", textAlign:"center"}}>
                                Do you want to delete Category <u>{deleteCategory.name}</u> ? 
                                <Button className="bg-primary" type="button" onClick={deleteIt}>Delete</Button>
                                <Button className="bg-danger" type="button" onClick={()=>{setDeleteCategory()}}>Cancel</Button> 
                    </div>:null}
                    <div className="mainpanel-table">
                      <Table hover responsive className="admin-tables">
                        <thead style={{backgroundColor:"#eee"}}>
                          <tr>
                            <th className="p-3">Sr. No</th>
                            <th className="p-3">Category Name</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                           {
                           categories
                           ? categories.length!= 0 ? categories.map((category,index) => (
                            <tr key={index} style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                              <td className="p-3">{index+1}</td>
                              <td className="p-3">{category.name}</td>
                              <td className="p-3"> 
                                <FontAwesomeIcon className="mx-3" icon={faEdit} onClick={()=>{setUpdateCategory(category)}} style={{fontSize:"18px"}} />
                                <FontAwesomeIcon className="mx-3" icon={faTrash} onClick={()=>{setDeleteCategory(category)}} style={{fontSize:"18px"}} /> 
                              </td>
                            </tr>
                           ))
                        :<p>No Categories Found</p>
                        : <p>Loading</p>}
                        </tbody>
                      </Table>
                    </div>
                </div>
          </Container>
        </div>
    )
}

export default ManageCategory
