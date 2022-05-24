const Notification = ({ msg, color }) => {
  if (msg === null)
    return null

  const style = {
    color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style = { style }>{ msg }</div>
}

export default Notification