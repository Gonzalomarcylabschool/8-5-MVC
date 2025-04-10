import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getFellowById, updateFellowName, deleteFellow } from '../adapters/fellowAdapters';

const FellowDetails = () => {
  const [fellow, setFellow] = useState({})
  const [newFellowName, setNewFellowName] = useState('');
  const navigate = useNavigate();

  // on load, get the fellow by id
  useEffect(() => {

  }, [])

  // when the delete button is pressed, send a DELETE request
  const handleDeleteFellow = async () => {
    navigate('/');
  }

  // when the form is filled out, send a PATCH request
  const handleUpdateFellow = async (e) => {
    e.preventDefault();
    setNewFellowName('');
  }

  return (
    <>
      <Link to='/'>Go Home</Link>
      <h1>Fellow Details</h1>
      <p>Name: {fellow.name}</p>
      <p>Id: {fellow.id}</p>
      <form onSubmit={handleUpdateFellow}>
        <label htmlFor="name">Update Fellow Name</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} placeholder='New Name' />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeleteFellow} className='danger'>Delete Fellow</button>
    </>
  )
}

export default FellowDetails;