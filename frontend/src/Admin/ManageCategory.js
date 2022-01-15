import React, {useState, useEffect} from 'react'
import { faEdit,faTrash,faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Container,Row,Col,Button, Table} from 'react-bootstrap';
import apiCall from '../Utils/apiCall'; 

function ManageCategory(props) {

    const [categories, setCategories] = useState();
    const [updateCategory, setUpdateCategory] = useState();
    const [deleteCategory, setDeleteCategory] = useState();
    const [categoryName, setCategoryName] = useState();

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
        const newCategory = {id: updateCategory.id, name: categoryName}
        console.log(updateCategory)
        console.log(newCategory)
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
            <Container>
            <Row>
              <Col md={12}>
                  
                <div>
                    <div className="heading formheading">
                        <h3><FontAwesomeIcon id="formicon" icon={faTasks} style={{fontSize:"30px", marginRight:"10px"}} />Manage Category</h3>
                    </div>
                    {updateCategory?
                        <div className="mb-3 p-3" style={{backgroundColor:"#cfdee3", textAlign:"center"}}>
                            <form className="form-inline">
                                Do you want to update Category Name of {updateCategory.name} ? 
                                <input className="form-control mx-3" type="text" placeholder="New Category Name" onChange={(e)=>{setCategoryName(e.target.value)}} />
                                <Button className="bg-success" type="button" onClick={update}>Update</Button>
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
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th>Sr. No</th>
                            <th>Category Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                           {
                           categories
                           ? categories.length!= 0 ? categories.map((category,index) => (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{category.name}</td>
                              <td> 
                                <Button type="button"><FontAwesomeIcon icon={faEdit} onClick={()=>{setUpdateCategory(category)}} style={{fontSize:"18px"}} /></Button>
                                <Button className="btn-delete" type="button" onClick={()=>{setDeleteCategory(category)}}><FontAwesomeIcon icon={faTrash} style={{fontSize:"18px"}} /></Button>  
                              </td>
                            </tr>
                           ))
                        :<p>No Categories Found</p>
                        : <p>Loading</p>}
                        </tbody>
                      </Table>
                    </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default ManageCategory
