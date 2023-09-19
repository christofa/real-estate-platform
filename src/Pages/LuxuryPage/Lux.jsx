/* eslint-disable react/prop-types */
import "./Lux.scss";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";

function Lux({luxContent}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredFlats, setFilteredFlats] = useState(luxContent);

  useEffect(() => {
    // Filter by name and address
    const filteredByNameAndAddress = luxContent.filter((flat) =>
      flat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flat.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    // Filter by price range
    const filteredByPrice = filteredByNameAndAddress.filter((flat) =>
      (minPrice === '' || flat.price >= parseInt(minPrice)) &&
      (maxPrice === '' || flat.price <= parseInt(maxPrice))
    );
  
    setFilteredFlats(filteredByPrice);
  }, [searchQuery, minPrice, maxPrice, luxContent]);

  return (
    <Layout>
      <div className="Lux-section">
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
          {filteredFlats.map((luxs) => (
            <div className="cards" key={luxs.id}>
              <img src={luxs.coverImage} alt={luxs.name} />
              <h3>{luxs.name}</h3>
              <p><b>Address: </b> {luxs.address}</p>
              <p><b>Price:</b> ${luxs.price}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Lux;
