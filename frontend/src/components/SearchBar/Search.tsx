import { BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import './Search.css';
import { fetchProducts } from "../../services/api";
import AppContext from '../../context/AppContext';
import ProductsSearch from '../Products/ProductsSearch';

interface FiltersState {
  selectedFilters: string[];
  priceRange: string;
}

export default function Search() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContext must be used within a Provider");
  }

  const { setProducts, setLoading } = context;
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<FiltersState>({
    selectedFilters: [],
    priceRange: ''
  });

  const categoryOptions = [
    { value: 'calçado', label: 'Calçado' },
    { value: 'bola', label: 'Bola' },
    { value: 'acessorio', label: 'Acessório' },
    { value: 'outro', label: 'Outro' }
  ];

  const sportOptions = [
    { value: 'futebol', label: 'Futebol' },
    { value: 'basquete', label: 'Basquetebol' },
    { value: 'volei', label: 'Voleibol' },
    { value: 'futsal', label: 'Futsal' },
    { value: 'outros', label: 'Outros' }
  ];

  const priceOptions = [
    { value: '', label: 'Todos os preços' },
    { value: '0-50', label: 'entre 0-50 BRL' },
    { value: '50-250', label: 'entre 50-250 BRL' },
    { value: '250-500', label: 'entre 250-500 BRL' },
    { value: '500+', label: 'acima de 500 BRL' }
  ];

  const applyFilters = (products: any[]) => {
    let filteredProducts = [...products];

    if (filters.selectedFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return product.filters &&
               filters.selectedFilters.some(f => product.filters.includes(f));
      });
    }

    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = Number(product.price);
        switch (filters.priceRange) {
          case '0-50':
            return price <= 50;
          case '50-250':
            return price > 50 && price <= 250;
          case '250-500':
            return price > 250 && price <= 500;
          case '500+':
            return price > 500;
          default:
            return true;
        }
      });
    }

    return filteredProducts;
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const prod = await fetchProducts(searchValue);
      const filtered = applyFilters(prod);
      setProducts(filtered);
    } catch {
      setProducts([]);
    }

    setLoading(false);
  };

  const handleFilterSearch = async () => {
    setLoading(true);

    try {
      const prod = await fetchProducts(searchValue);
      const filtered = applyFilters(prod);
      setProducts(filtered);
    } catch {
      setProducts([]);
    }

    setLoading(false);
  };

  const handleClearFilters = () => {
    setFilters({
      selectedFilters: [],
      priceRange: ''
    });

    handleFilterSearch();
  };

  const handleFilterChange = (value: string) => {
    const updated = filters.selectedFilters.includes(value)
      ? filters.selectedFilters.filter(f => f !== value)
      : [...filters.selectedFilters, value];

    setFilters({
      ...filters,
      selectedFilters: updated
    });
  };

  const handlePriceChange = (value: string) => {
    setFilters({
      ...filters,
      priceRange: value
    });
  };

  return (
    <>
      <h2 className="busque">Busque</h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <button type="submit" className="search_button">
          <BsSearch />
        </button>
        <input
          type="search"
          value={searchValue}
          placeholder="Buscar produtos"
          className="search_input"
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </form>

      <div className="filters-container">
        <div className="filters-header">
          <h3>Filtros</h3>
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
            type="button"
          >
            Limpar Filtros
          </button>
        </div>

        <div className="filters-content">
          <div className="filter-group">
            <h4>Categoria</h4>
            <div className="filter-options">
              {categoryOptions.map(category => (
                <label key={category.value} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedFilters.includes(category.value)}
                    onChange={() => handleFilterChange(category.value)}
                  />
                  <span>{category.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Modalidade</h4>
            <div className="filter-options">
              {sportOptions.map(sport => (
                <label key={sport.value} className="filter-option">
                  <input
                    type="checkbox"
                    checked={filters.selectedFilters.includes(sport.value)}
                    onChange={() => handleFilterChange(sport.value)}
                  />
                  <span>{sport.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Preço</h4>
            <div className="filter-options">
              {priceOptions.map(price => (
                <label key={price.value} className="filter-option">
                  <input
                    type="radio"
                    name="priceRange"
                    value={price.value}
                    checked={filters.priceRange === price.value}
                    onChange={() => handlePriceChange(price.value)}
                  />
                  <span>{price.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button 
          className="search-button"
          onClick={handleFilterSearch}
          type="button"
        >
          Buscar
        </button>
      </div>

      <ProductsSearch />
    </>
  );
}
