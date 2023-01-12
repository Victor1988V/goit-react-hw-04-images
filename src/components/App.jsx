import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './api/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import PropTypes from 'prop-types';

export function App() {
  const [status, setStatus] = useState('idle');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (!search) {
      return;
    }
    setStatus('pending');

    getImages(search, page)
      .then(response => {
        if (response.hits.length === 0) {
          throw new Error('Sorry :(');
        }
        setImageList([...imageList, ...response.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        alert(error.message);
        setStatus('rejected');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleSearchSubmit = search => {
    setSearch(search);
    setPage(1);
    setImageList([]);
  };

  const loadMoreBtn = () => {
    setPage(prevState => ({
      page: prevState.page + 1,
    }));
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery
        status={status}
        imageList={imageList}
        loadMore={loadMoreBtn}
      />
    </div>
  );
}

// export class App extends Component {
// state = {
//   status: 'idle',
//   search: '',
//   page: 1,
//   imageList: [],
// };

// componentDidUpdate(_, prevState) {
//   const { search, imageList, page } = this.state;

//   if (prevState.search !== search || prevState.page !== page) {
//     this.setState({ status: 'pending' });

//     getImages(search, page)
//       .then(response => {
//         if (response.hits.length === 0) {
//           throw new Error('Sorry :(');
//         }

//         this.setState({
//           imageList: [...imageList, ...response.hits],
//           status: 'resolved',
//         });
//       })
//       .catch(error => {
//         alert(error.message);
//         this.setState({ status: 'rejected' });
//       });
//   }
// }

// handleSearchSubmit = search => {
//   this.setState({ search, page: 1, imageList: [] });
// };

// loadMoreBtn = () => {
//   this.setState(prevState => ({
//     page: prevState.page + 1,
//   }));
// };

//   render() {
//     const { status, imageList } = this.state;

//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearchSubmit} />
//         <ImageGallery
//           status={status}
//           imageList={imageList}
//           loadMore={this.loadMoreBtn}
//         />
//       </div>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

ImageGallery.propTypes = {
  status: PropTypes.string.isRequired,
  imageList: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
};
