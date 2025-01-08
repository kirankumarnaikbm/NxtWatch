import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {formatDistanceToNow} from 'date-fns'
import {FaFire} from 'react-icons/fa'
import SavedVideosContext from '../../context/SavedVideosContext'
import Header from '../Header'
import NavBar from '../NavBar'

import './index.css'

const Card = props => {
  const {cardDetails} = props
  const {thumbnailUrl, title, channel, publishedAt, id, viewCount} = cardDetails
  const {name, profileImageUrl} = channel
  const years = formatDistanceToNow(new Date(publishedAt))
  const inputString = years
  const lastTwoParts = inputString.split(' ').slice(-2).join(' ')

  return (
    <Link to={`/videos/${id}`} style={{textDecoration: 'none', color: '#000'}}>
      <li>
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="videoSaved-img"
        />
        <div style={{display: 'flex'}}>
          <img
            src={profileImageUrl}
            alt={name}
            className="profilet-img t-img"
          />
          <div>
            <b>
              <p>{title}</p>
            </b>
            <p>{name}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p>{viewCount} views </p>
              <BsDot style={{fontSize: '1.5rem'}} />
              <p>{lastTwoParts}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

const SavedVideos = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {savedVideos} = value
        return (
          <div style={{minHeight: '100vh'}}>
            <Header />
            <div style={{display: 'flex', minHeight: '88vh'}}>
              <NavBar />
              <div
                style={{margin: '0', backgroundColor: '#f7f7f7', width: '100%'}}
              >
                {savedVideos.length === 0 && (
                  <div className="failure-view-con">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      alt="no saved videos"
                      className="no-saved-videos"
                    />
                    <h1>No saved videos found</h1>
                    <p>Save your videos by clicking a button</p>
                  </div>
                )}
                {savedVideos.length !== 0 && (
                  <>
                    <div className="save-head">
                      <FaFire
                        style={{
                          fontSize: '1.7rem',
                          marginRight: '0.5rem',
                          color: '#ff0000',
                        }}
                      />
                      <h1 style={{margin: '0'}}>Saved Videos</h1>
                    </div>
                    <ul className="video-saved-card-con">
                      {savedVideos.map(each => (
                        <Card key={each.id} cardDetails={each} />
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}
export default SavedVideos
