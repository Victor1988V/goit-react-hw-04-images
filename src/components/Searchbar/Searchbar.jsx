import PropTypes from 'prop-types';
import { useState } from 'react';

export function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInputChange = event => {
    setValue(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (value.trim() === '') {
      alert('Please, entrie something');
      return;
    }

    onSubmit(event.currentTarget.search.value.toLowerCase());
    setValue('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          🔍
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={value}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleInputChange = event => {
//     this.setState({ value: event.target.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.value.trim() === '') {
//       alert('Please, entrie something');
//       return;
//     }

//     this.props.onSubmit(event.currentTarget.search.value.toLowerCase());
//     this.setState({ value: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form className="SearchForm" onSubmit={this.handleSubmit}>
//           <button type="submit" className="SearchForm-button">
//             🔍
//             <span className="SearchForm-button-label">Search</span>
//           </button>

//           <input
//             className="SearchForm-input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="search"
//             value={this.state.value}
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
