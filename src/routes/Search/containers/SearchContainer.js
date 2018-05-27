import { connect } from 'react-redux'
import { search } from '../modules/search'


import Search from '../components/SearchView'


const mapDispatchToProps = {
  search :  (a) => search(a),
}

const mapStateToProps = (state) =>{
  return {
    isLoading:state.search.isLoading,
    list : state.search.list
  }
}

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:


    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(Search)
