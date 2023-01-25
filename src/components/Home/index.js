import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home_container">
      <div className="home_content">
        <h1 className="home_heading">Find The Job That Fits Your Life</h1>
        <p className="home_description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button className="findJobs_btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
