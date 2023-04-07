import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAddress } from "../../state/reducers/address";
import { MaterialButton, MaterialInput } from "../../components/materialUI";

const AddressForm = (props) => {
  const { initialData } = props;
  const [name, setName] = useState(initialData ? initialData.name : "");
  console.log(initialData);
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
  const dispatch = useDispatch();
  const inputContainer = {
    width: "100%",
    marginRight: 10,
  };

  const onAddressSubmit = () => {
    const payload = {
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
    dispatch(addAddress(payload.address));
    props.onSubmitForm(payload);
  };
  const RenderAddressForm = () => {
    return (
      <>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="Pincode"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="Locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="City/District/Town"
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div className="flexRow">
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
              label="Landmark (Optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              focus={true}
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
              />
              <span style={{ display: "inline-block", marginLeft: "5px" }}>
                Home
              </span>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <input
                type="radio"
                onClick={() => setAddressType("work")}
                name="addressType"
                value="work"
              />
              <span style={{ display: "inline-block", marginLeft: "5px" }}>
                Work
              </span>
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
      </>
    );
  };

  return (
    <div className="checkoutStep" style={{ background: "#f5faff" }}>
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
