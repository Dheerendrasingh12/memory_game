function Card(props) {
  return (
    <div>
      <div className="item">
        <div className={props.toggled ? "toggled" : ""}>
          <img className="face" src={props.item.img} alt="face" />
          <div
            className="back"
            onClick={() =>
              !props.stopFlip && props.handleSelectedCards(props.item)
            }
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
