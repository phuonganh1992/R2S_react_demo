import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import majorService from "../services/majorService";
import DefaultLayout from "./../container/DefaultLayout";

const MajorEdit = () => {
  const [id, setId] = useState();
  const [major, setMajor] = useState({ id: 0, name: "" });
  const [message, setmessage] = useState();

  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    setId(param.id);
    if (param.id > 0) {
      majorService.get(param.id).then((res) => {
        setMajor(res.data);
      });
    }
  }, [param.id]);

  const handleBack = () => {
    navigate("/de/major");
  };
  const handleChange = (e) => {
    // ??? copy major
    const newData = { ...major };

    console.log(major);
    console.log(newData);
    newData[e.target.name] = e.target.value;
    //newDate[name]
    //  newData.name

    console.log(newData);
    setMajor(newData);
  };

  const handleSave = () => {
    if (major.id === 0) {
      majorService.add(major).then((res) => {
        if (res.errorCode === 0) navigate("/de/major");
        else setmessage(res.message);
      });
    } else {
      majorService.update(major.id, major).then((res) => {
        if (res.errorCode === 0) navigate("/de/major");
        else setmessage(res.message);
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
                      Major{" "}
                      <small className="text-muted">
                        {id > 0 ? "edit" : "new"}
                      </small>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="text-center text-danger">{message}</div>
                <form>
                  <Input
                    type="text"
                    label="Major name"
                    name="name"
                    onChange={handleChange}
                    defaultValue={major.name}
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

export default MajorEdit;
