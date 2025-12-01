import { BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import './Search.css';
import { fetchProducts } from "../../services/api";
import AppContext from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import Card from '../Card/Card';
import { Product } from '../../services/api';

interface FiltersState {
  selectedFilters: string[];
  priceRange: string;
}

export default function Search() {
  const context = useContext(AppContext);
  const { t } = useLanguage();

  if (!context) {
    throw new Error("AppContext must be used within a Provider");
  }

  const { products, setProducts, setLoading, loading } = context;
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<FiltersState>({
    selectedFilters: [],
    priceRange: ''
  });

  const categoryOptions = [
    { value: 'calçado', label: t('option_footwear') },
    { value: 'bola', label: t('option_ball') },
    { value: 'acessorio', label: t('option_accessory') },
    { value: 'outro', label: t('option_other') }
  ];

  const sportOptions = [
    { value: 'futebol', label: t('option_football_sport') },
    { value: 'basquete', label: t('option_basketball_sport') },
    { value: 'volei', label: t('option_volleyball_sport') },
    { value: 'futsal', label: t('option_futsal') },
    { value: 'outros', label: t('option_other_sports') }
  ];

  const priceOptions = [
    { value: '', label: t('option_all_prices') },
    { value: '0-50', label: t('option_price_0_50') },
    { value: '50-250', label: t('option_price_50_250') },
    { value: '250-500', label: t('option_price_250_500') },
    { value: '500+', label: t('option_price_above_500') }
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
    
    if (!searchValue.trim()) {
      alert(t('placeholder_search_products'));
      return;
    }
    
    setLoading(true);

    try {
      const prod = await fetchProducts(searchValue);
      const filtered = applyFilters(prod);
      setProducts(filtered);
    } catch (error) {
      console.error('Erro na busca:', error);
      setProducts([]);
    }

    setLoading(false);
  };

  const handleFilterSearch = async () => {
    setLoading(true);

    try {
      const prod = await fetchProducts(searchValue || '');
      const filtered = applyFilters(prod);
      setProducts(filtered);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
      setProducts([]);
    }

    setLoading(false);
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

  const handleClearFilters = () => {
    setSearchValue('');
    setFilters({
      selectedFilters: [],
      priceRange: ''
    });
    setProducts([]);
  };

  return (
    <>
      <h2 className="busque">{t('heading_search')}</h2>

      <form className="search-bar" onSubmit={handleSearch}>
        <button type="submit" className="search_button">
          <BsSearch />
        </button>
        <input
          type="search"
          value={searchValue}
          placeholder={t('placeholder_search_products')}
          className="search_input"
          onChange={({ target }) => setSearchValue(target.value)}
        />
      </form>

      <div className="filters-container">
        <div className="filters-header">
          <h3>{t('heading_filters')}</h3>
          <button 
            className="clear-filters-btn"
            onClick={handleClearFilters}
            type="button"
          >
            {t('button_clear_filters')}
          </button>
        </div>

        <div className="filters-content">
          <div className="filter-group">
            <h4>{t('heading_category')}</h4>
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
            <h4>{t('heading_sport')}</h4>
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
            <h4>{t('heading_price_filter')}</h4>
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
          {t('button_search_filter')}
        </button>
      </div>

      {loading && <p className="loading-message">{t('message_loading_products_search')}</p>}

      {products && products.length > 0 && (
        <section className="products-grid">
          {products.map((product: Product) => (
            <Card key={product._id} product={product} />
          ))}
        </section>
      )}

      {products && products.length === 0 && !loading && (
        <p className="no-results-message">{t('message_no_results')}</p>
      )}
    </>
  );
}