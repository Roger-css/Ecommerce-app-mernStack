import "./style.css";
const Card = (props) => {
  return (
    <div {...props} className="myCard">
      {props.children}
    </div>
  );
};

export default Card;
