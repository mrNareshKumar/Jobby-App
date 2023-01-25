import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
  } = jobData

  return (
    <li className="job_item">
      <Link to={`/jobs/${id}`} className="link">
        <div className="jobCard_container">
          <div className="companyDetails_container">
            <img
              className="company_Logo"
              src={companyLogoUrl}
              alt="company Logo"
            />
            <div className="jobTitle_rating_container">
              <h1 className="jobTitle">{title}</h1>
              <div className="rating_container">
                <AiFillStar className="rating_icons" />
                <p className="rating_text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location_empType_package_container">
            <div className="location_empType">
              <div className="location">
                <MdLocationOn className="job_icons" />
                <p className="job_icons_text">{location}</p>
              </div>
              <div className="empType">
                <BsBriefcaseFill className="job_icons" />
                <p className="job_icons_text">{employmentType}</p>
              </div>
            </div>
            <div className="package">
              <p className="package_text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="description_container">
            <h1 className="description_heading">Description</h1>
            <p className="description_text">{jobDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
