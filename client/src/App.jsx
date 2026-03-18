import React from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import './App.css'

const App = () => {
  // These routes now match your custom music venues
  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/afrobeats-island',
      element: <LocationEvents locationId={1} /> // Passing locationId
    },
    {
      path: '/rb-city',
      element: <LocationEvents locationId={2} /> // Passing locationId
    },
    {
      path: '/jazz-town',
      element: <LocationEvents locationId={3} /> // Passing locationId
    },
    {
      path: '/hip-hop-district',
      element: <LocationEvents locationId={4} /> // Passing locationId
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        {/* Updated title */}
        <h1>Music Country</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          {/* Removed the non-working "Events" button */}
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App