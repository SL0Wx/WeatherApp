import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";
import "./search.css";

const Search = ({ favorites, onSearchChange }) => {
    const [search, setSearch] = useState(null);
    
    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map(city => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        }
                    })
                }
            }) 
            .catch(err => console.error(err));
    }

    const handleSearch = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    function handleSearchFavorites(city) {
        setSearch(city);
        onSearchChange(city);
    }

    return (
        <>
            <AsyncPaginate placeholder="Search city" debounceTimeout={600} value={search} onChange={handleSearch} loadOptions={loadOptions} />
            {favorites.length > 0 && (
                <div className="favContainer">
                    <div className="favorites">
                        <label className="title">Favorites</label>
                        {favorites.map((city, i) => (
                            <div className="favoritesList">
                                <label className="favoritesListItem" key={i} onClick={() => handleSearchFavorites(city)}>{city.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
                
            )}
        </>
    )
}

export default Search;