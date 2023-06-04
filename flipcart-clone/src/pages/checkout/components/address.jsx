import React, { useState } from "react";
import { MaterialButton, MaterialInput } from "../../../components/materialUI";

const AddressForm = (props) => {
  const { initialData, keyValue } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    initialData ? initialData.pinCode : ""
  );
  const [locality, setLocality] = useState(
    initialData ? initialData.locality : ""
  );
  const [address, setAddress] = useState(
    initialData ? initialData.address : ""
  );
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ""
  );
  const [state, setState] = useState(initialData ? initialData.state : "");
  const [landmark, setLandmark] = useState(
    initialData ? initialData.landmark : ""
  );
  const [alternatePhone, setAlternatePhone] = useState(
    initialData ? initialData.alternatePhone : ""
  );
  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ""
  );
  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };
  const onAddressSubmit = () => {
    const payload = initialData?._id
      ? {
          address: {
            name,
            mobileNumber,
            pinCode,
            locality,
            address,
            cityDistrictTown,
            state,
            landmark,
            alternatePhone,
            addressType,
            _id: initialData._id,
          },
        }
      : {
          address: {
            name,
            mobileNumber,
            pinCode,
            locality,
            address,
            cityDistrictTown,
            state,
            landmark,
            alternatePhone,
            addressType,
          },
        };
    props.onSubmitForm(payload);
  };
  const RenderAddressForm = () => {
    return (
      <React.Fragment key={keyValue}>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={props.focus ? true : false}
              label="Alternate Phone (Optional)"
              value={alternatePhone}
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: "15px", fontSize: "16px" }}>
          <label>Address Type</label>
          <div className="flexBox" style={{ marginTop: "10px" }}>
            <div>
              <input
                type="radio"
                onClick={() => setAddressType("home")}
                name="addressType"
                value="home"
                onChange={() => null}
                id="home"
                checked={addressType == "home" ? true : false}
              />
              <label
                htmlFor="home"
                style={{ display: "inline-block", marginLeft: "5px" }}
              >
                Home
              </label>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                onChange={() => null}
                name="addressType"
                value="work"
                id="work"
                checked={addressType == "work" ? true : false}
              />
              <label
                htmlFor="work"
                style={{ display: "inline-block", marginLeft: "5px" }}
              >
                Work
              </label>
            </div>
          </div>
        </div>
        <div className="flexRow">
          <MaterialButton
            title="SAVE AND DELIVER HERE"
            handleClick={onAddressSubmit}
            bgColor="#fb641b"
            style={{
              width: "250px",
              margin: "20px 0",
            }}
          />
        </div>
      </React.Fragment>
    );
  };
  if (props.withoutLayout) {
    return RenderAddressForm();
  }
  return (
    <div
      key={keyValue}
      className="checkoutStep"
      style={{ background: "#f5faff" }}
    >
      <div onClick={props.show} className={`checkoutHeader`}>
        <div>
          <span className="stepNumber">+</span>
          <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
        </div>
      </div>
      <div
        style={{
          padding: "0 60px",
          paddingBottom: "20px",
          boxSizing: "border-box",
        }}
      >
        {RenderAddressForm()}
      </div>
    </div>
  );
};

export default AddressForm;
