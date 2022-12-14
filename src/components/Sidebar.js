import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './Sidebar.css'
import { selectUser } from '../features/userSlice'

function Sidebar() {
  const user = useSelector(selectUser)
  const recentItem = topic => {
    return (
      <div className="sidebar__recentItem">
        <span className="sidebar__hash">#</span>
        <p>{topic}</p>
      </div>
    )
  }
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JLWZlZWR8MXx8fGvufDB8fHw%3D&w=1000&q=80"
          alt="background"
        />
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {user?.displayName[0]}
        </Avatar>
        <h2> {user.displayName} </h2>
        <h4> {user.email} </h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2.100</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">3.457</p>
        </div>
        <div className="sidebar__bottom">
          <p> Recent</p>
          {recentItem('reactjs')}
          {recentItem('softwareengeneering')}
          {recentItem('dev')}
          {recentItem('frontend')}
          {recentItem('backend')}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
