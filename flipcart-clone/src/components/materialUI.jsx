import { useState } from "react";
import "./style.css";
import { IoCloseOutline } from "react-icons/io5";
const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div
            style={{ marginLeft: "50px" }}
            className="modalClose"
            onClick={props.onClose}
          >
            <IoCloseOutline size="50px" style={{ cursor: "pointer" }} />
          </div>
          <div className="modalContainer">{props.children}</div>
        </div>
      </div>
    </>
  );
};

const MaterialInput = (props) => {
  const [focus, setFocus] = useState(props.focus ? props.focus : false);

  return (
    <div className="materialInput">
      <label
        className={`label ${focus ? "focus" : ""}`}
        style={{
          top: 0,
          lineHeight: "none",
          marginLeft: "10px",
        }}
      >
        {props.label}
      </label>
      <div
        style={{
          display: "flex",
        }}
      >
        <input
          className="input"
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={(e) => {
            setFocus(true);
          }}
          onBlur={(e) => {
            if (e.target.value === "") {
              setFocus(false);
            }
          }}
          style={{ paddingLeft: "10px" }}
        />
        {props.rightElement ? props.rightElement : null}
      </div>
    </div>
  );
};

const MaterialButton = (props) => {
  return (
    <div onClick={props.handleClick} style={{ width: "100%", ...props.style }}>
      <button
        disabled={props.disabled ? props.disabled : false}
        style={{ backgroundColor: props.bgColor, color: props.textColor }}
        className="materialButton"
      >
        {props.title && props.title}
      </button>
    </div>
  );
};

const DropdownMenu = (props) => {
  return (
    <div className="headerDropdownContainer">
      {props.menu}
      <div className="dropdown">
        <div className="upArrow"></div>
        {props.firstMenu}
        <ul className="headerDropdownMenu">
          {props.menus &&
            props.menus.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    item.handleClick ? item.handleClick() : () => null;
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export { Modal, MaterialInput, MaterialButton, DropdownMenu };
