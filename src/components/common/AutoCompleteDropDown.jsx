/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import LOADER from '../../assets/loader.svg';
import ProviderList from '../ProviderList';
import ApiService from '../../utils/apiService';

class AutoCompleteDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showResults: false,
      keyword: '',
      results: [],
      searchTerm: ''
    };
  }

  toggleResultsDropdown = (showResults) => {
    this.setState({
      showResults
    });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  getResults = (event) => {
    // TASK 3: AUTOCOMPLETE DROPDOWN    
    // On input, Make a GET request to the server, passing
    // the value(s) entered as a query param. i.e
    // GET <BASE_URL>/api/providers?q={input}
    // Use the response to populate the dropdown.
    // The dropdown should only show while the user is typing,
    // and should also cater for situations where no result is available.
    // NOTE: This component should be as reusable as possible.
    const { value } = event.target;
    const { searchTerm } = this.state;
    this.setState({ searchTerm: value }, () => {
      ApiService.get(ApiService.ENDPOINTS.providers, searchTerm)
      .then((data) => {
        this.setState({
          results: data.data
        });
      });
    })
  }

  onResultSelected = (selectedResult) => {
    const { onResultSelected } = this.props;
    if (onResultSelected) {
      onResultSelected(selectedResult.id);
    }
  }

  render() {
    const { results } =this.state;
    const { isLoading, searchTerm } = this.state;
    const { placeholder } = this.props;
    return (
      <div className="dropdown active autocomplete-dropdown">
        <input
          type="text"
          className="input__style_1 input__search"
          placeholder={placeholder || "Find a Provider"}
          onChange={this.getResults}
        />
        {isLoading && <img src={LOADER} className="loader" alt="loading" />}

        {searchTerm && <ProviderList providers={results} onResultSelected={this.onResultSelected} />}
      </div>
    );
  }
}

AutoCompleteDropDown.propTypes = {
  placeholder: PropTypes.string,
  onResultSelected: PropTypes.instanceOf(Function).isRequired,
  customListComponent: PropTypes.instanceOf(Object),
};

export default AutoCompleteDropDown;
