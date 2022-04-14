import React, { useState, useEffect } from "react";
import studentService from "./../services/studentService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import Input from "./../components/Input";
import InputRadio from "./../components/InputRadio";
import { Button } from "react-bootstrap";
import Select from "../components/Select";
import majorService from "./../services/majorService";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [majors, setMajors] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: 0,
      stuId: "",
      firstName: "",
      lastName: "",
      gender: 0,
      phone: "",
      email: "",
      majorId: 0,
    },
    validationSchema: Yup.object({
      stuId: Yup.string().required("required"),
      firstName: Yup.string().required("required").min(5, ">=5"),
      lastName: Yup.string().required("required"),
      gender: Yup.number().required("required"),
      phone: Yup.string()
        .required("required")
        .matches(/^[0-9]{9}/, "need match pattern 9 digits"),
      email: Yup.string().required("required").email("email format"),
      majorId: Yup.number().min(1, "select major"),
    }),
    onSubmit: (value) => {
      handleFormSubmit(value);
    },
  });
  const handleFormSubmit = (data) => {
    console.log(data);
    if (data.id === 0) {
      studentService.add(data).then((res) => {
        if (res.errorCode === 0) {
          handleModalClose();
          toast.success("A new student added!");
          loadData();
        } else {
          toast.error(res.message);
        }
      });
    } else {
      studentService.update(data.id, data).then((res) => {
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
      studentService.get(id).then((res) => {
        formik.setValues(res.data);
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    studentService.list().then((res) => {
      setStudents(res.data);
    });
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    studentService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
        toast.success("Delete successfully");
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
                  Student <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
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
                    <th>Student Id</th>
                    <th>Full name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, idx) => (
                    <tr key={student.id}>
                      <td>{idx + 1}</td>
                      <td>{student.stuId}</td>
                      <td>{`${student.lastName} ${student.firstName}`}</td>
                      <td>
                        <i
                          className={`fa-solid fa-${
                            student.gender === 1 ? "person-dress" : "person"
                          }`}
                        ></i>
                      </td>
                      <td>{student.phone}</td>
                      <td>{student.email}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => showEditPage(e, student.id)}
                        >
                          <i className="bi-pencil-square text-primary"></i>
                        </a>
                        <a
                          href="#"
                          onClick={(e) => handleDelete(e, student.id)}
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
      <Modal
        show={showModal}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Student
            <small className="text-muted">
              {formik.values.id > 0 ? "edit" : "new"}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Input
              type="text"
              label="Student Id"
              frmField={formik.getFieldProps("stuId")}
              err={formik.touched.stuId && formik.errors.stuId}
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
            <Select
              label="Major"
              id="major"
              values={majors}
              name="majorId"
              onChange={(e) => {
                formik.setTouched({ majorId: true });
                formik.setFieldValue(
                  e.target.name,
                  Number(e.target.value).valueOf()
                );
                console.log(e.target.value);
              }}
              selectedValue={formik.values.majorId}
              err={formik.errors.majorId && formik.touched.majorId}
              errMessage={formik.errors.majorId}
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

export default Student;
