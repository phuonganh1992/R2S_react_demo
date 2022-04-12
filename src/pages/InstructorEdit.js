import React, { useState, useEffect } from "react";
import Input from "./../components/Input";
import CustomButton from "./../components/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import instructorService from "../services/instructorService";
import InputRadio from "../components/InputRadio";

const InstructorEdit = () => {
  const [id, setId] = useState();
  const [instructor, setinstructor] = useState({
    id: 0,
    code: "",
    firstName: "",
    lastName: "",
    gender: 0,
    phone: "",
    email: "",
  });
  const [message, setmessage] = useState();
  const naviagate = useNavigate();
  const param = useParams();
  useEffect(() => {
    setId(param.id);
    if (param.id > 0) {
      instructorService.get(param.id).then((res) => {
        setinstructor(res.data);
      });
    }
  }, [param.id]);

  const handleBack = () => {
    naviagate("/instructor");
  };
  const handleChange = (e) => {
    const newData = { ...instructor };
    newData[e.target.name] = e.target.value;
    setinstructor(newData);
  };

  const handleChangeRadio = (e) => {
    const newData = { ...instructor };
    newData[e.target.name] = Number(e.target.value).valueOf();
    setinstructor(newData);
  };

  const handleSave = () => {
    if (instructor.id === 0) {
      instructorService.add(instructor).then((res) => {
        if (res.errorCode === 0) naviagate("/instructor");
        else setmessage(res.message);
      });
    } else {
      instructorService.update(instructor.id, instructor).then((res) => {
        if (res.errorCode === 0) {
          if (res.errorCode === 0) naviagate("/instructor");
          else setmessage(res.message);
        }
      });
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-primary bt-5">
              <div className="card-header">
                <div className="row">
                  <div className="col">
                    <h3 className="card-title">
                      Instructor <small className="text-muted"></small>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="text-center text-danger">{message}</div>
                <form>
                  <Input
                    type="text"
                    label="Instructor Id"
                    id="code"
                    name="code"
                    placeholder="Instructor Id"
                    onChange={handleChange}
                    defaultValue={instructor.code}
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
                            name="lastName"
                            id="lastName"
                            placeholder="Last name"
                            onChange={handleChange}
                            defaultValue={instructor.lastName}
                          />
                        </div>
                        <div className="col-sm">
                          <Input
                            type="text"
                            label="firstName"
                            isLabelHidden={true}
                            name="firstName"
                            id="firstName"
                            placeholder="First name"
                            onChange={handleChange}
                            defaultValue={instructor.firstName}
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
                  />

                  <Input
                    type="tel"
                    label="Phone"
                    name="phone"
                    placeholder="Phone number"
                    onChange={handleChange}
                    defaultValue={instructor.phone}
                  />
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email address"
                    onChange={handleChange}
                    defaultValue={instructor.email}
                  />
                </form>
              </div>
              <div className="card-footer">
                <div className="text-center">
                  <CustomButton
                    color="secondary"
                    className="me-1"
                    onClick={handleBack}
                  >
                    Back
                  </CustomButton>
                  <CustomButton
                    color="secondary"
                    className="me-1"
                    onClick={handleSave}
                  >
                    Save
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorEdit;
