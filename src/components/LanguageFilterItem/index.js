// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageData, isActive, onChangeFilter} = props
  const {id, language} = languageData

  const onChangeLanguage = () => {
    onChangeFilter(id)
  }

  const languageClassName = isActive ? 'active-language-item' : 'language-item'

  return (
    <button
      type="button"
      className={languageClassName}
      onClick={onChangeLanguage}
    >
      {language}
    </button>
  )
}

export default LanguageFilterItem
