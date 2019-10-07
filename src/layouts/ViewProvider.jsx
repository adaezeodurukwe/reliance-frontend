import React from 'react';
import ApiService from '../utils/apiService';
import ProviderCard from '../components/ProviderCard';

class ViewProvider extends React.Component {
  // TASK 5:
  // Render Single Provider View Here
  // Feel free to use existing styles,
  // or add new ones if you want to :)
  state = {
    provider: ''
  }

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    const url = ApiService.ENDPOINTS.providers
    ApiService.get(`${url}/${id}`)
      .then((data) => {
        this.setState({
          provider: data.data
        });
      });
  }

  displayProvider() {
    let output;
    const { provider } = this.state
    if (!provider) {
      output = <p>Error getting Provider</p>
    } else {
      output = (<ProviderCard
        key={provider.id}
        imageUrl={provider.imageUrl}
        address={provider.location.address}
        name={provider.name}
        rating={provider.rating}
        providerType={provider.type}
        cardType="bg"
        onClick={() => this.handleClick(provider.id)}
      />)
    }

    return output;
  }

  render () {
    return ( 
     <div>{this.displayProvider()}</div>
    );
  }
} 

export default ViewProvider;