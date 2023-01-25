import './index.css'

const NotFound = () => (
  <div className="notFound_container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="notFound_image"
    />
    <h1 className="notFound_heading">Page Not Found</h1>
    <p className="notFound_description">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
