import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoDetail from './components/VideoDetail'
import NotFound from './components/NotFound'
import SavedVideos from './components/SavedVideos'
import SavedVideosContext from './context/SavedVideosContext'
import './App.css'

// Replace your code here
class App extends Component {
  state = {savedVideos: []}

  addSavedVideos = savedCardDetail => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, savedCardDetail],
    }))
  }

  render() {
    const {savedVideos} = this.state
    return (
      <SavedVideosContext.Provider
        value={{savedVideos, addSavedVideos: this.addSavedVideos}}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/trending" component={Trending} />
          <Route exact path="/gaming" component={Gaming} />
          <Route exact path="/videos/:id" component={VideoDetail} />
          <Route exact path="/saved-videos" component={SavedVideos} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
