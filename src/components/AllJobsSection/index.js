import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import UserProfile from '../UserProfile'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    salaryRange: 0,
    employmentType: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, salaryRange, employmentType} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = fetchData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        title: job.title,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
        location: job.location,
        rating: job.rating,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value}, () => {
      this.getJobs()
    })
  }

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <div className="search_container">
        <input
          className="input_field"
          type="search"
          value={searchInput}
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />
        <button
          className="search_icon_container"
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search_icon" />
        </button>
      </div>
    )
  }

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0
    return shouldShowJobsList ? (
      <div className="JobsView_container">
        <ul className="jobs_list">
          {jobsList.map(job => (
            <JobCard jobData={job} key={job.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="noJobs_data">
        <img
          className="no_jobs_image"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="noJob_heading">No Jobs Found</h1>
        <p className="noJob_description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureView_container">
      <img
        className="failure_image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureView_heading">Oops! Something Went Wrong</h1>
      <p className="failureView_description">
        We cannot seem to find the page you are looking for.
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loaderView_container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  renderEmploymentTypeFilter = () => {
    const {employmentType} = this.state
    return (
      <div className="filter_container">
        <h1 className="filter_heading">Employment Types</h1>
        <ul>
          {employmentTypesList.map(item => (
            <li className="filter_list_item" key={item.employmentTypeId}>
              <input
                type="checkbox"
                key="label"
                value={item.employmentTypeId}
                onChange={each => {
                  let selected = [...employmentType]
                  if (each.target.checked) {
                    selected.push(item.employmentTypeId)
                  } else {
                    selected = selected.filter(
                      itemId => itemId !== item.employmentTypeId,
                    )
                  }
                  this.setState({employmentType: selected}, this.getJobs)
                }}
                checked={employmentType.includes(item.employmentTypeId)}
              />
              <label
                key={item.employmentTypeId}
                className="filter_label"
                htmlFor={item.employmentTypeId}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSalaryRangeFilter = () => {
    const {salaryRange} = this.state
    return (
      <div className="filter_container">
        <h1 className="filter_heading">Salary Ranges</h1>
        <ul>
          {salaryRangesList.map(item => (
            <li className="filter_list_item" key={item.salaryRangeId}>
              <input
                type="radio"
                key="label"
                value={item.salaryRangeId}
                onChange={each => {
                  this.setState({salaryRange: each.target.value}, this.getJobs)
                }}
                checked={salaryRange === item.salaryRangeId}
              />
              <label
                key={item.salaryRangeId}
                className="filter_label"
                htmlFor={item.salaryRangeId}
              >
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="all_jobs_section">
        <ul className="profileANDfilters_container">
          <div className="mobileView_search">{this.renderSearch()}</div>
          <UserProfile />
          <hr className="line" />
          {this.renderEmploymentTypeFilter()}
          <hr className="line" />
          {this.renderSalaryRangeFilter()}
        </ul>
        <ul className="desktopView">
          <div className="desktopView_search">{this.renderSearch()}</div>
          {this.renderAllJobs()}
        </ul>
      </div>
    )
  }
}

export default AllJobsSection
