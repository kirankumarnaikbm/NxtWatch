import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-con">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="website-logo-image"
          alt="website logo"
        />
      </Link>
      <div className="logout-btn-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          className="profile-image"
          alt="profile"
        />
        <div>
          <Popup
            trigger={
              <button type="button" className="logout-btn">
                Logout
              </button>
            }
            modal
            closeOnDocumentClick
          >
            {close => (
              <div className="modal-h">
                <p>Are you sure, you want to logout?</p>
                <button
                  type="button"
                  onClick={close}
                  style={{marginRight: '0.5rem'}}
                  className="logout-btn"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onClickLogout}
                  style={{
                    marginLeft: '0.5rem',
                    width: '76px',
                  }}
                  className="login-button"
                >
                  Confirm
                </button>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
