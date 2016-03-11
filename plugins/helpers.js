/* eslint no-param-reassign: [2, { "props": false }] */

module.exports = function helpers(env, cb) {
  /**
   * Capitalize the given word
   *
   * @param {String} word
   * @result {String} capitalized word
   */
  function capitalize(word) {
    return word
      .substr(0, 1)
      .toUpperCase()
      .concat(word.substr(1));
  }

  /**
   * Get the page-title for a pattern-template
   *
   * @param {Object} page - current page
   * @return {String} pagetitle
   */
  function getPatternTitle(page) {
    var parentCategory = page.parent.parent;
    var currentPageUrl = page.filepath.relative;
    var title = '';
    var prop;

    for (prop in parentCategory) {
      if (currentPageUrl.indexOf(prop) !== -1) {
        title = prop;
      }
    }

    return capitalize(title);
  }

  /**
   * Get the subcategory-url for the navigation
   *
   * @param {Object} pages - all pages for a category
   * @return {String} subcategory-url
   */
  function getSubcategoryUrl(pages) {
    var key = Object.keys(pages)[0];
    return pages[key]
      .filepath
      .relative
      .replace('md', 'html');
  }

  // add the functions to the environment, so we can use it
  env.helpers.getPatternTitle = getPatternTitle;
  env.helpers.getSubcategoryUrl = getSubcategoryUrl;

  // tell the plugin manager we are done
  cb();
};
