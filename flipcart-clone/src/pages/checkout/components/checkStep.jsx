const CheckoutStep = ({
  stepNumber,
  stepTitle,
  active,
  children,
  handleClick,
}) => (
  <div
    onClick={handleClick}
    className="checkoutStep"
    style={{ marginBottom: "10px" }}
  >
    <div className={`checkoutHeader ${active ? "active" : ""}`}>
      <div>
        <span className="stepNumber">{stepNumber}</span>
        <span className="stepTitle">{stepTitle}</span>
      </div>
    </div>
    {children}
  </div>
);

export default CheckoutStep;
