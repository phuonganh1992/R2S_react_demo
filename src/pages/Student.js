import React, {useState, useEffect} from "react";

const Student=() =>{
    const [message, setMessage] = useState("");

    useEffect(()=>{

    },[]);

    const formSubmitHandler = (e) => {

    }

    return (
        <>
            <>
                <div className="container mt-4">
                    <div className="card border-primary bt-5">
                        <div className="card-header">
                            <div className="row">
                                <div className="col">
                                    <h3 className="card-title">Student <small className="text-muted">list</small></h3>
                                </div>
                                <div className="col-auto">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                            data-bs-target="#editModal"><i className="bi-plus-lg"></i> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered border-primary table-hover table-striped">
                                    <thead>
                                    <tr className="table-primary border-primary">
                                        <th style={{width: "50px"}}>#</th>
                                        <th>Student Id</th>
                                        <th>Full name</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th style={{width: "80px"}}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>01-03-9384</td>
                                        <td>Trần Minh Tâm</td>
                                        <td><i className="fa-solid fa-person"></i></td>
                                        <td>0935875636</td>
                                        <td>tammt@yahoo.com</td>
                                        <td>
                                            <a href="#"><i className="bi-pencil-square text-primary"></i></a>
                                            <a href="#"><i className="bi-trash text-danger"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>01-03-9384</td>
                                        <td>Nguyễn Thị Thanh</td>

                                        <td><i className="fa-solid fa-person-dress"></i></td>
                                        <td>0935875636</td>
                                        <td>tammt@yahoo.com</td>
                                        <td>
                                            <a href="#"><i className="bi-pencil-square text-primary"></i></a>
                                            <a href="#"><i className="bi-trash text-danger"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>01-03-9384</td>
                                        <td>Trần Minh Tâm</td>
                                        <td><i className="fa-solid fa-person"></i></td>
                                        <td>0935875636</td>
                                        <td>tammt@yahoo.com</td>
                                        <td>
                                            <a href="#"><i className="bi-pencil-square text-primary"></i></a>
                                            <a href="#"><i className="bi-trash text-danger"></i></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>01-03-9384</td>
                                        <td>Nguyễn Thị Thanh</td>

                                        <td><i className="fa-solid fa-person-dress"></i></td>
                                        <td>0935875636</td>
                                        <td>tammt@yahoo.com</td>
                                        <td>
                                            <a href="#"><i className="bi-pencil-square text-primary"></i></a>
                                            <a href="#"><i className="bi-trash text-danger"></i></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Major</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="txtMajor" className="col-sm-3 col-form-label">Major name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="txtMajor"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
}

export default Student;