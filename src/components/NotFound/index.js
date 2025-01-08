import Header from '../Header'
import NavBar from '../NavBar'

import './index.css'

const NotFound = () => (
  <div style={{minHeight: '100vh'}}>
    <Header />
    <div style={{display: 'flex', minHeight: '88vh'}}>
      <NavBar />
      <div style={{margin: '0', backgroundColor: '#f1f1f1', width: '100%'}}>
        <div className="not-found-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
            className="not-found-img"
          />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
