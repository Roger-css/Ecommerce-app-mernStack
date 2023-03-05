import "./style.css";
const Card = (props) => {
  return (
    <div {...props} className="card">
      {props.children}
    </div>
  );
};

export default Card;
