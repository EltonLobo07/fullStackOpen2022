import InputRow from './InputRow'

const NameNumberForm = ({ onSubmit, nameState, nameEventHandler, numberState, numberEventHandler }) => 
{
  //Form doesn't check if name and number input fields are empty before adding to persons array which is in the main component - App

  return (
    <form onSubmit = { onSubmit }>
      <table>
        <tbody>
          <InputRow text = "Name:" value = { nameState } func = { nameEventHandler } />
          <InputRow text = "Number:" value = { numberState } func = { numberEventHandler } />
        </tbody>
      </table>

      <button type = "submit">add</button>
    </form>
  )
}

export default NameNumberForm