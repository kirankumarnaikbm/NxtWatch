import {useState} from 'react'
import {Link} from 'react-router-dom'
import {IoReorderThree, IoGameController} from 'react-icons/io5'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {BiListPlus} from 'react-icons/bi'

import './index.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{display: 'flex'}} className="nav-bar-con">
      <div className="main-content">
        <button
          type="button"
          className="toggle-button"
          onClick={toggleSidebar}
          style={{color: isOpen ? '#3b82f6' : '#000'}}
        >
          <IoReorderThree />
        </button>
        <ul className="nav-logos-con">
          <Link to="/" style={{color: '#000', textDecoration: 'none'}}>
            <li style={{fontSize: '1.4rem'}}>
              <MdHome />
            </li>
          </Link>
          <Link to="/trending" style={{color: '#000', textDecoration: 'none'}}>
            <li style={{fontSize: '1.2rem'}}>
              <FaFire />
            </li>
          </Link>
          <Link to="/gaming" style={{color: '#000', textDecoration: 'none'}}>
            <li style={{fontSize: '1.2rem'}}>
              <IoGameController />
            </li>
          </Link>
          <Link
            to="/saved-videos"
            style={{color: '#000', textDecoration: 'none'}}
          >
            <li style={{fontSize: '1.5rem'}}>
              <BiListPlus />
            </li>
          </Link>
        </ul>
      </div>
      <div className={`navbar ${isOpen ? 'open' : ''}`}>
        {isOpen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '88vh',
            }}
          >
            <ul>
              <Link to="/" style={{color: '#000', textDecoration: 'none'}}>
                <li>Home</li>
              </Link>
              <Link
                to="/trending"
                style={{color: '#000', textDecoration: 'none'}}
              >
                <li>Trending</li>
              </Link>
              <Link
                to="/gaming"
                style={{color: '#000', textDecoration: 'none'}}
              >
                <li>Gaming</li>
              </Link>
              <Link
                to="/saved-videos"
                style={{color: '#000', textDecoration: 'none'}}
              >
                <li>Saved videos</li>
              </Link>
            </ul>
            <div>
              <h1 style={{fontSize: '18px'}}>CONTACT US</h1>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="contact-logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="contact-logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="contact-logo"
                />
              </div>
              <p>Enjoy! Now to see your channels and recommendations!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
