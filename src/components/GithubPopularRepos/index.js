import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const apiUrl = 'https://apis.ccbp.in/popular-repos?language='
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    popularReposList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getPopularRepos()
  }

  onChangeFilter = filterId => {
    this.setState({activeId: filterId}, this.getPopularRepos)
  }

  getPopularRepos = async () => {
    const {activeId} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const options = {
      method: 'GET',
    }
    const response = await fetch(`${apiUrl}${activeId}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const popularRepos = data.popular_repos
      const updatedData = popularRepos.map(eachRepo => ({
        avatarUrl: eachRepo.avatar_url,
        forksCount: eachRepo.forks_count,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
      }))
      this.setState({
        popularReposList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularReposList} = this.state
    return (
      <ul className="repos-container">
        {popularReposList.map(eachRepoDetails => (
          <RepositoryItem
            eachRepoDetails={eachRepoDetails}
            key={eachRepoDetails.id}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageData={eachLanguage}
              isActive={activeId === eachLanguage.id}
              onChangeFilter={this.onChangeFilter}
            />
          ))}
        </ul>
        {this.renderResult()}
      </div>
    )
  }
}

export default GithubPopularRepos
