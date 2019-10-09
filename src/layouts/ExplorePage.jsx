import React from 'react';
import NavBar from '../components/common/NavBar';
import ProviderGrid from '../components/ProviderGrid';
import NewProvider from '../components/NewProvider';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';
import { jsonGet } from '../utils/utils';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      fullData: [],
      isLoading: false,
      keyword: ''
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        this.setState({
          isLoading: false,
          data: data.data,
          fullData: data.data
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    // P.s the JSON search function you created in utils
    // can come in handy here ;)
    // i.e jsonGet(json, 'location.address') to get the address
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    const { value } = event.target;
    const { fullData } = this.state;
    if (!value) this.loadData();
    const searchData = fullData.filter((provider) => {
      if (jsonGet(provider, 'name').includes(value) || jsonGet(provider, 'location.address').includes(value) || jsonGet(provider, 'type').includes(value)) return provider;
    });
    return this.setState({ data: searchData });
  }

  render() {
    const { history } = this.props;
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row">
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
            </div>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <ProviderGrid
                providers={data}
                history={history}
              />
            )}
          </section>
          <section className="main__new-provider fixed">
            <NewProvider />
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
