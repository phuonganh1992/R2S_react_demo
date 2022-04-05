import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import majorService from "../services/majorService";

const Major = () => {
  const navigate = useNavigate();
  const [majors, setmajors] = useState([]);
  const [message, setmessage] = useState();

  const showEditPage = (e, id) => {
    e.preventDefault();
    navigate(`/de/major/${id}`);
  };

  useEffect(() => {
    majorService.list().then((res) => {
      setmajors(res.data);
    });
  }, []);

  const loadData = () => {
    majorService.list().then((res) => res.data);
  };

  const handleDelete = (e, id) => {
    console.log(id);
    e.preventDefault();
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
      }
    });
  };

  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => showEditPage(e, 0)}
                  data-bs-target="#editModal"
                >
                  <i className="bi-plus-lg"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary">
                    <th style={{ width: "50px" }}>#</th>
                    <th>Major Name</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {majors.map((major, idx) => (
                    <tr key={major.id}>
                      <td>{idx + 1}</td>
                      <td>{major.name}</td>
                      <td>
                        <a href="#" onClick={(e) => showEditPage(e, major.id)}>
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a href="#" onClick={(e) => handleDelete(e, major.id)}>
                          <i className="bi-trash text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                New Major
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label htmlFor="txtMajor" className="col-sm-3 col-form-label">
                    Major name
                  </label>
                  <div className="col-sm-9">
                    <input type="text" className="form-control" id="txtMajor" />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Major;
