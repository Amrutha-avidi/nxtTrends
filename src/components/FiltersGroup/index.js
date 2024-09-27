import React from 'react'
import './index.css'

const FiltersGroup = (props) => {
  const {
    categoryOptions,
    activeCategoryId,
    changeCategory,
    ratingsList,
    activeRatingId,
    changeRating,
    searchInput,
    changeSearchInput,
    clearFilters,
    enterSearchInput } = props

  const renderSearchInput = () => (
    <div className='search-input-container'>
      <input
        value={searchInput}
        type='search'
        className='search-input'
        placeholder='Search'
        onChange={(e) => changeSearchInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && enterSearchInput()}
      />
    </div>
  )
  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{
        categoryOptions.map(category => {
          const onClickCategoryItem = () => changeCategory(category.categoryId)
          const isActive = category.categoryId === activeCategoryId
          const categoryClassName = isActive ?
            'category-name active-category-name'
            : 'category-name'

          return (
            <li className="category-item"
              key={category.categoryId}
              onClick={onClickCategoryItem}>
              <p className={categoryClassName}>{category.name}</p>
            </li>
          )
        })

      }</ul>
    </>
  )
  const renderRatingsFiltersList = () => (
    <>
      <h1 className="category-heading">Rating</h1>
      <ul className="categories-list">{
        ratingsList.map(rating => {
          const ratingClassName =
            activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`
          const onClickRatingItem = () => changeRating(rating.ratingId)

          return (
            <li
              className="rating-item"
              key={rating.ratingId}
              onClick={onClickRatingItem}
            >
              <img
                src={rating.imageUrl}
                alt={`rating ${rating.ratingId}`}
                className="rating-img"
              />
              <p className={ratingClassName}>& up</p>
            </li>
          )
        })

      }</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFiltersList()}
      <button
        type="button"
        className="clear-filters-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup 