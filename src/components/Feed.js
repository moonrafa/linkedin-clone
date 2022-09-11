import React, { useState } from 'react'
import './Feed.css'
import CreateIcon from '@material-ui/icons/Create'
import InputOption from './InputOption'
import ImageIcon from '@material-ui/icons/Image'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import EventNoteIcon from '@material-ui/icons/EventNote'
import Posts from './Posts'
import { useEffect } from 'react'
import { db, timestamp } from './firebase'

function Feed() {
  const [input, setInput] = useState('')
  const [posts, setPosts] = useState([])
  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot =>
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        )
      )
  }, [])

  const sendPost = e => {
    e.preventDefault()
    db.collection('posts').add({
      name: 'Rafaelly Rodrigues',
      description: 'err',
      message: input,
      photoUrl: '',
      timestamp: timestamp()
    })
    setInput('')
  }
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              type="text"
            />
            <button type="submit" onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#c0cBcd" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7fc15e"
          />
        </div>
      </div>
      {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
        <Posts
          key={id}
          name={name}
          description={description}
          message={message}
          photoUrl={photoUrl}
        />
      ))}
    </div>
  )
}

export default Feed
