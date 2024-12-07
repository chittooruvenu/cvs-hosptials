import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from "react-router-dom";
/* npm install react-bootstrap bootstrap axios*/
/*https://github.com/harsh17112000/pagination_react/blob/main/src/componetns/Home.js
https://www.youtube.com/watch?v=qhtuXPDzfXA
*/
const ShowUser = () => {
    const [data, setData] = useState([]);
    const deleteApi = "http://localhost:8080/deleteUser";
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
   
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');
 
  

   const handelDelete = id => {
    fetch(deleteApi.concat("/") + id, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        setData(values => {
          return values.filter(item => item.id !== id)
        })
      
      })
  }
  

    // handle next
    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)
    }

    // handle previous
    const handlePrevios = () => {
        if (page === 1) return page;
        setPage(page - 1)
    }

       const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    
    if(getSearch.length > 0)
    {     
     const searchdata= data.filter( (item)=> item.fname.toLowerCase().includes(getSearch));
     
     setPageData(searchdata);
    } else {
      setPageData(filterdata);
    }
    setQuery(getSearch);
  }

    useEffect(() => {
      const getFilerdata= async()=>{
      const reqData= await fetch("http://localhost:8080/users");
      const resData= await reqData.json();
        setData(resData.userList)
        setFilterdata(resData.userList);
    }
    getFilerdata();
    }, [page])

    useEffect(() => {
        const pagedatacount = Math.ceil(data.length / 5);
        setPageCount(pagedatacount);

        if (page) {
            const LIMIT = 5;
            const skip = LIMIT * page // 5 *2 = 10
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
            setPageData(dataskip)
        }
    }, [data])
    return (
        <>
            <div className="container">
                <div className='col-md-12 mt-3 mb-3'>
              <h3 className='mb-3'>Search From Appointment</h3>                
                <div className="col-md-6">                
                <input  type="text" name='name' value={query}   className="form-control" onChange={(e)=>handlesearch(e)} placeholder='Search by Name...' />
              </div>          
            </div>

                <div className='table_div mt-3'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>E-Mail</th>
                                 <th>Actions</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pageData.length > 0 ?
                                    pageData.map((element, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{element.id}</td>
                                                    <td>{element.fname}</td>
                                                    <td>{element.email}</td>
                                                      <td>
                    <Link to={`/edit-user/${element.id}`}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </Link>
                    <Link to={`/user/${element.id}`}>
                      <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                        <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handelDelete(element.id)}
                    ></i>
                  
                  </td>
                                                </tr>
                                            </>
                                        )
                                    }) : <div className='d-flex justify-content-center mt-4'>
                                        Loading... <Spinner animation="border" variant='danger' />
                                    </div>
                            }

                        </tbody>
                    </Table>
                </div>
                <div className='d-flex justify-content-end'>
                    <Pagination>

                        <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
                        {
                            Array(pageCount).fill(null).map((ele, index) => {
                                return (
                                    <>
                                        <Pagination.Item active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                    </>
                                )
                            })
                        }
                        <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
                    </Pagination>
                </div>
            </div>
        </>
    )
}

export default ShowUser



// slice(0,4)= (start,end-1)