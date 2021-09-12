import './index.css'
// Write your code here
const RepositoryItem = props => {
  const {eachRepoDetails} = props
  const {avatarUrl, name, starsCount, forksCount, issuesCount} = eachRepoDetails

  return (
    <li className="repo-item-container">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repo-name">{name}</h1>
      <div className="repo-count-container">
        <div className="stat-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stat-avatar"
          />
          <p className="stat-count">{starsCount} stars</p>
        </div>
        <div className="stat-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stat-avatar"
          />
          <p className="stat-count">{forksCount} forks</p>
        </div>
        <div className="stat-count-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open-issues"
            className="stat-avatar"
          />
          <p className="stat-count">{issuesCount} open issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
