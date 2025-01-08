import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {FaFire} from 'react-icons/fa'
import {BsDot} from 'react-icons/bs'
import Header from '../Header'
import NavBar from '../NavBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

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
          className="videoTrending-img"
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

class Trending extends Component {
  state = {videosTrending: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.apiFetchTrending()
  }

  apiFetchTrending = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        id: each.id,
        viewCount: each.view_count,
        title: each.title,
      }))
      this.setState({
        videosTrending: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.ok === false) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  status = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {videosTrending} = this.state
    return (
      <ul className="video-trending-card-con">
        {videosTrending.map(each => (
          <Card key={each.id} cardDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request.
        <br />
        Please try again
      </p>
      <div>
        <button
          type="button"
          onClick={this.apiFetchTrending}
          className="login-button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container con2" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div style={{minHeight: '100vh'}}>
        <Header />
        <div style={{display: 'flex', minHeight: '88vh'}}>
          <NavBar />
          <div style={{margin: '0', backgroundColor: '#f7f7f7', width: '100%'}}>
            <div className="trend-head">
              <FaFire
                style={{
                  fontSize: '1.7rem',
                  marginRight: '0.5rem',
                  color: '#ff0000',
                }}
              />
              <h1 style={{margin: '0'}}>Trending</h1>
            </div>
            {this.status()}
          </div>
        </div>
      </div>
    )
  }
}
export default Trending
