/* eslint-disable react/prop-types */
import "./Flat.scss";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from 'react';


function Flat({ flats }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredFlats, setFilteredFlats] = useState(flats);

  useEffect(() => {
    // Filter by name and address
    const filteredByNameAndAddress = flats.filter((flat) =>
      flat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flat.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Filter by price range
    const filteredByPrice = filteredByNameAndAddress.filter((flat) =>
      (minPrice === '' || flat.price >= parseInt(minPrice)) &&
      (maxPrice === '' || flat.price <= parseInt(maxPrice))
    );
  
    setFilteredFlats(filteredByPrice);
  }, [searchQuery, minPrice, maxPrice, flats]);

  console.log(filteredFlats)
  
  return (
    <Layout>
      <div className="Flat-section">
        <div className="cover-1">
          <div className="name-section">
            <p>Search by name or address:</p>
            <input
              type="text"
              placeholder="Search by name and address"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="price-section">
            <p>Search with price range:</p>
            <div className="price-input">
              <div>
                Max{" "}
                <input
                  type="number"
                  placeholder="price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
              <div>
                Min{" "}
                <input
                  type="number"
                  placeholder="price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="cover-2">
          {filteredFlats.map((flat) => (
            <div className="cards" key={flat.id}>
              <img src={flat.coverImage} alt={flat.name} />
              <h3>{flat.name}</h3>
              <p>Address: {flat.address}</p>
              <p>Price: ${flat.price}</p>
            </div>
          ))}
        </div>

        
      </div>
    </Layout>
  );
}

export default Flat;
