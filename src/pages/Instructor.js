import React, { useEffect, useState } from "react";
import instructorService from "../services/instructorService";
import { Button, Modal } from "react-bootstrap";
import Input from "./../components/Input";
import { Field, Form, useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import InputRadio from "./../components/InputRadio";

const Instructor = () => {
  const [instructors, setinstructors] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      code: "",
      firstName: "",
      lastName: "",
      gender: 0,
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      id: Yup.number().required("required"),
      code: Yup.string().required("required"),
      firstName: Yup.string().required("required").min(5, ">=5"),
      lastName: Yup.string().required("required"),
      gender: Yup.number().required("required"),
      phone: Yup.string()
        .required("required")
        .matches(/^[0-9]{9}/, "need match pattern 9 digits"),
      email: Yup.string().required("required").email("email format"),
    }),
    onSubmit: (value) => {
      handleFormSubmit(value);
    },
  });

  const [showModal, setShowModal] = useState();

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const showEditPage = (e, id) => {
    e.preventDefault();
    handleModalShow();
    if (id === 0) {
      formik.resetForm();
      handleModalShow();
    } else {
      instructorService.get(id).then((res) => {
        formik.setValues(res.data);
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    instructorService.list().then((res) => {
      setinstructors(res.data);
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    instructorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.success("Delete successfully");
      }
    });
  };

  const handleFormSubmit = (data) => {
    if (data.id === 0) {
      // handleRadioChange();
      instructorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          handleModalClose();
          toast.success("A new instructor added!");
          loadData();
        } else {
          toast.error(res.message);
        }
      });
    } else {
      instructorService.update(data.id, data).then((res) => {
        if (res.errorCode === 0) {
          if (res.errorCode === 0) {
            loadData();
            handleModalClose();
            toast.success("Update successfull");
          } else {
            toast.error(res.message);
          }
        }
      });
    }
  };

  // const handleRadioChange = (e) => {
  //   console.log("vao day");
  //   console.log(e.target.name);
  //   formik.setFieldValue(e.target.name, Number(e.target.value).valueOf());
  // };

  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  Instructor <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-target="#editModal"
                  onClick={(e) => showEditPage(e, 0)}
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
                    <th>Instructor Id</th>
                    <th>Fullname</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor, idx) => (
                    <tr key={instructor.id}>
                      <td>{idx + 1}</td>
                      <td>{instructor.code}</td>
                      <td>
                        {`${instructor.lastName} ${instructor.firstName}`}
                      </td>
                      <td>
                        <i
                          className={`fa-solid fa-${
                            instructor.gender === 1 ? "person-dress" : "person"
                          }`}
                        ></i>
                      </td>
                      <td>{instructor.phone}</td>
                      <td>{instructor.email}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => showEditPage(e, instructor.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleDelete(e, instructor.id)}
                        >
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
            Instructor
            <small className="text-muted">
              {formik.values.id > 0 ? "edit" : "new"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              type="text"
              label="Instructor Id"
              frmField={formik.getFieldProps("code")}
              err={formik.touched.code && formik.errors.code}
              errMessage={formik.errors.code}
            />
            <div className="row">
              <div className="col-sm-3">Fullname</div>
              <div className="col-sm">
                <div className="row">
                  <div className="col-sm">
                    <Input
                      type="text"
                      label="lastName"
                      isLabelHidden={true}
                      frmField={formik.getFieldProps("lastName")}
                      err={formik.touched.lastName && formik.errors.lastName}
                      errMessage={formik.errors.lastName}
                    />
                  </div>
                  <div className="col-sm">
                    <Input
                      type="text"
                      label="firstName"
                      isLabelHidden={true}
                      frmField={formik.getFieldProps("firstName")}
                      err={formik.touched.firstName && formik.errors.firstName}
                      errMessage={formik.errors.firstName}
                    />
                  </div>
                </div>
              </div>
            </div>
            <InputRadio
              values={[
                { id: 0, name: "male" },
                { id: 1, name: "female" },
              ]}
              label="Gender"
              name="gender"
              isInline={true}
              // onChange={handleRadioChange}
              onChange={(e) =>
                formik.setFieldValue(
                  e.target.name,
                  Number(e.target.value).valueOf()
                )
              }
              selectedValue={formik.values.gender}
            />

            <Input
              type="tel"
              label="Phone"
              frmField={formik.getFieldProps("phone")}
              err={formik.touched.phone && formik.errors.phone}
              errMessage={formik.errors.phone}
            />
            <Input
              type="email"
              label="Email"
              frmField={formik.getFieldProps("email")}
              err={formik.touched.email && formik.errors.email}
              errMessage={formik.errors.email}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!formik.dirty || !formik.isValid}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Instructor;
