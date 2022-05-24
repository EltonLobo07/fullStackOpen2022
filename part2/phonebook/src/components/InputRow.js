const InputRow = ({ text, value, func }) => {
  return (
    <tr>
      <th>{text}</th> 
      <td><input value = { value } onChange = { func } /></td>
    </tr>
  )
}

export default InputRow