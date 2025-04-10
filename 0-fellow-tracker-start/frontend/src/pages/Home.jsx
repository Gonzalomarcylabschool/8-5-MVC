import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getAllFellows, createFellow } from '../adapters/fellowAdapters';

const Home = () => {
  // Get all fellows from the serverstate
  const [fellows, setFellows] = useState([]);
  // form input state
  const [newFellowName, setNewFellowName] = useState('');

  // Get me the most up to date full list of fellows
  useEffect(() => {
    const doFetch = async () => {
      const [allFellows, error] = await getAllFellows();
      setFellows(allFellows);
    }
    doFetch();
  }, [])

  // Use the form data to create a POST request to create a new fellow
  const handleCreateFellow = async (e) => {
    e.preventDefault();
    console.log(`Creating fellow: ${newFellowName}`);
    setNewFellowName('');
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={handleCreateFellow}>
        <label htmlFor="name">Add A New Fellow</label>
        <input type="text" name="name" id="name" value={newFellowName} onChange={(e) => setNewFellowName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {
          fellows.map((fellow) => {
            return <li key={fellow.id}>
              <Link to={`/fellows/${fellow.id}`}>
                {fellow.name} (User {fellow.id})
              </Link>
            </li>
          })
        }
      </ul >
    </>
  )
}

export default Home;