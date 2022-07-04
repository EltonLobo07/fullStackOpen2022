import { connect } from "react-redux";

const Notification = props => {
  const notification = props.notification; // useSelector(state => state.notification);

  if (notification === null)
    return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={style}>
      {notification}
    </div>
  );
}

const mapStateToProps = state => {
  return {notification: state.notification};
};

const NewNotification = connect(mapStateToProps)(Notification);

export default NewNotification;