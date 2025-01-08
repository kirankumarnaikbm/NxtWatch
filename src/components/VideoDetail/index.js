import {Component, useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'
import SavedVideosContext from '../../context/SavedVideosContext'
import Header from '../Header'
import NavBar from '../NavBar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const VideoPageDetail = props => {
  const [like, setLike] = useState(false)
  const [dislike, setDislike] = useState(false)
  const {cardDetails} = props
  const {
    thumbnailUrl,
    title,
    channel,
    publishedAt,
    viewCount,
    description,
    videoUrl,
  } = cardDetails
  const {name, profileImageUrl, subscriberCount} = channel
  const years = formatDistanceToNow(new Date(publishedAt))
  const inputString = years
  const lastTwoParts = inputString.split(' ').slice(-2).join(' ')
  const toggleLike = () => {
    if (dislike && !like) {
      setDislike(false)
      setLike(true)
    } else {
      setLike(!like)
    }
  }
  const toggleDislike = () => {
    if (!dislike && like) {
      setDislike(true)
      setLike(false)
    } else {
      setDislike(!dislike)
    }
  }

  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {addSavedVideos} = value
        const saveVideoBtn = () => {
          addSavedVideos(cardDetails)
        }
        return (
          <div>
            <div>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-link"
              >
                <div
                  style={{
                    backgroundImage: `url(${thumbnailUrl})`,
                    height: '60vh',
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className="play-button">
                    <div className="play-icon"> </div>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <div style={{margin: '0'}}>
                <b>
                  <p style={{margin: '0'}}>{title}</p>
                </b>
                <div className="content-con">
                  <div
                    style={{display: 'flex', alignItems: 'center', margin: '0'}}
                  >
                    <p>{viewCount} views </p>
                    <BsDot style={{fontSize: '1.5rem'}} />
                    <p>{lastTwoParts}</p>
                  </div>
                  <div
                    style={{display: 'flex', alignItems: 'center', margin: '0'}}
                  >
                    <button
                      type="button"
                      style={{
                        margin: '0',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        border: '0',
                        marginRight: '0.5rem',
                        color: like ? '#3b82f6' : '#64748b',
                        cursor: 'pointer',
                      }}
                      onClick={toggleLike}
                    >
                      <BiLike />
                      Like
                    </button>
                    <button
                      type="button"
                      style={{
                        margin: '0',
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '0.5rem',
                        backgroundColor: 'transparent',
                        border: '0',
                        color: dislike ? '#2563eb' : '#64748b',
                        cursor: 'pointer',
                      }}
                      onClick={toggleDislike}
                    >
                      <BiDislike />
                      Dislike
                    </button>
                    <button
                      type="button"
                      style={{
                        margin: '0',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        border: '0',
                        marginRight: '0.5rem',
                        cursor: 'pointer',
                      }}
                      onClick={saveVideoBtn}
                    >
                      <BiListPlus />
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <hr style={{margin: '0', marginBottom: '0.5rem'}} />
              <div style={{display: 'flex'}}>
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="profilet-img"
                  style={{margin: '0', marginRight: '0.5rem'}}
                />
                <div>
                  <p style={{margin: '0'}}>{name}</p>
                  <p>{subscriberCount} subcribers</p>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}

class VideoDetail extends Component {
  state = {videosTrending: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.apiFetchTrending()
  }

  apiFetchTrending = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
        publishedAt: fetchedData.video_details.published_at,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        id: fetchedData.video_details.id,
        viewCount: fetchedData.video_details.view_count,
        title: fetchedData.video_details.title,
        description: fetchedData.video_details.description,
        videoUrl: fetchedData.video_details.video_url,
      }
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
      <div className="video-detail-con">
        <VideoPageDetail cardDetails={videosTrending} />
      </div>
    )
  }

  renderFailureView = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
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
      <button type="button" onClick={this.apiFetchTrending}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
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
          <div
            style={{
              margin: '0',
              backgroundColor: '#f7f7f7',
              width: '100%',
            }}
          >
            {this.status()}
          </div>
        </div>
      </div>
    )
  }
}
export default VideoDetail
