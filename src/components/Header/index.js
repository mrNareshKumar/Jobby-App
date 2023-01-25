import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav_header">
      <div className="nav_content">
        <div className="navBar_mobile">
          <Link to="/">
            <img
              className="website_logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav_menu">
            <li className="nav_menu_list_item">
              <Link to="/">
                <AiFillHome className="nav_menu_icon" />
              </Link>
            </li>
            <li className="nav_menu_list_item">
              <Link to="/jobs">
                <BsFillBriefcaseFill className="nav_menu_icon" />
              </Link>
            </li>
            <button
              className="logout_mobile_btn"
              type="button"
              onClick={onClickLogout}
            >
              <FiLogOut className="nav_menu_icon" />
            </button>
          </ul>
        </div>
        <div className="navBar_desktop">
          <Link to="/">
            <img
              className="website_logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav_menu">
            <li className="nav_menu_list_item">
              <Link to="/" className="nav_menu_desktop_link">
                Home
              </Link>
            </li>
            <li className="nav_menu_list_item">
              <Link to="/jobs" className="nav_menu_desktop_link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="logout_desktop_button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
