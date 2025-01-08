import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  addSavedVideos: () => {},
})

export default SavedVideosContext
