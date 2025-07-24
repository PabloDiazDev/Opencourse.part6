import {setFilter} from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setFilter(filterValue))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" placeholder="Type to filter..."onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter