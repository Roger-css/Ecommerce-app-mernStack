const CheckoutStep = ({
  stepNumber,
  stepTitle,
  active,
  body,
  handleClick,
  style,
  children,
  bodyStyle,
}) => (
  <div
    onClick={handleClick}
    className="checkoutStep"
    style={{ marginBottom: "10px", ...style }}
  >
    <div className={`checkoutHeader ${active ? "active" : ""}`}>
      <div>
        <span className="stepNumber">{stepNumber}</span>
        <span className="stepTitle">{stepTitle}</span>
      </div>
    </div>
    <div style={bodyStyle}>
      {body}
      {children}
    </div>
  </div>
);

export default CheckoutStep;
