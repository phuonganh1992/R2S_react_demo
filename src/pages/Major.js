import React, { useState, useEffect } from "react";
import majorService from "../services/majorService";
import { Button, Modal } from "react-bootstrap";
import Input from "./../components/Input";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomButton from "./../components/CustomButton";

const Major = () => {
  const [majors, setmajors] = useState([]);
  const [message, setmessage] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const formik = useFormik({
    initialValues: {
      id: 0,
      name: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required(),
      name: Yup.string().required("required").min(5, ">=5 characters"),
    }),
    onSubmit: (value) => {
      handleFormSubmit(value);
    },
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const showEditPage = (e, id) => {
    e.preventDefault();
    handleModalShow();

    if (id === 0) {
      formik.resetForm();
      handleModalShow();
    } else {
      majorService.get(id).then((res) => {
        formik.setValues(res.data);
      });
    }
  };

  useEffect(() => {
    majorService.list().then((res) => {
      setmajors(res.data);
    });
  }, []);

  const loadData = () => {
    majorService.list().then((res) => {
      setmajors(res.data);
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.success("Delete successfully");
      }
    });
  };

  const handleFormSubmit = (data) => {
    setIsWaiting(true);

    if (data.id === 0) {
      majorService.add(data).then((res) => {
        setIsWaiting(false);
        if (res.errorCode === 0) {
          handleModalClose();
          toast.success("A new major added!");
          loadData();
        } else {
          setmessage(res.message);
          toast.error(res.message);
        }
      });
    } else {
      majorService.update(data.id, data).then((res) => {
        setIsWaiting(false);
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
          toast.success("Update successfull");
        } else {
          toast.error(res.message);
        }
      });
    }
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

      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Major
            <small className="text-muted">
              {formik.values.id > 0 ? "edit" : "new"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              type="text"
              label="Major name"
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
              labelSize={13}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {/* <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid || isWaiting}
            onClick={formik.handleSubmit}
          >
            Save
          </Button> */}
          <CustomButton
            // type="submit"
            color="primary"
            disabled={!formik.dirty || !formik.isValid || isWaiting}
            isLoading={isWaiting}
            onClick={formik.handleSubmit}
          >
            Save
          </CustomButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Major;
