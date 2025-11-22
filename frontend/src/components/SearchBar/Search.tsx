import { BsSearch } from 'react-icons/bs';
import { useState, useContext } from 'react';
import './Search.css';
import fetchProducts from '../../api/fetchProducts';
import AppContext from '../../context/AppContext';
import ProductsSearch from '../Products/ProductsSearch';

// Interface para os filtros
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
  
  // Estado dos filtros integrado ao componente Search
  const [filters, setFilters] = useState<FiltersState>({
    selectedFilters: [],
    priceRange: ''
  });

  // Opções de filtros - CORRIGIDOS para coincidir com os dados
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

  // Função SIMPLIFICADA para aplicar filtros nos produtos
  const applyFilters = (products: any[]) => {
    console.log('Aplicando filtros em', products.length, 'produtos');
    console.log('Filtros ativos:', filters);
    
    let filteredProducts = [...products];

    // Aplicar filtros de categoria e modalidade
    if (filters.selectedFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        console.log('Produto:', product.name, 'Filtros do produto:', product.filters);
        
        // Verifica se algum filtro selecionado está presente nos filtros do produto
        const hasMatchingFilter = filters.selectedFilters.some(selectedFilter => {
          return product.filters && product.filters.includes(selectedFilter);
        });
        
        console.log('Produto passa no filtro?', hasMatchingFilter);
        return hasMatchingFilter;
      });
    }

    // Aplicar filtro de preço
    if (filters.priceRange) {
      filteredProducts = filteredProducts.filter(product => {
        const price = parseFloat(product.price);
        console.log('Verificando preço:', price, 'contra range:', filters.priceRange);
        
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

    console.log('Produtos após filtros:', filteredProducts.length);
    return filteredProducts;
  };

  // Função de busca que considera os filtros
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('handleSearch disparado com:', searchValue);
    setLoading(true);
    
    try {
      const prod = await fetchProducts(searchValue);
      console.log('Produtos recebidos no handleSearch:', prod);
      
      // DEBUG: Vamos ver a estrutura do primeiro produto
      if (prod.length > 0) {
        console.log('Estrutura do primeiro produto:', Object.keys(prod[0]));
        console.log('Primeiro produto completo:', prod[0]);
      }
      
      // Aplicar filtros aos produtos recebidos
      const filteredProducts = applyFilters(prod);
      console.log('Produtos após filtros:', filteredProducts);
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Erro na busca:', error);
      // Não deixar o loading infinito em caso de erro
      setProducts([]);
    }
    setLoading(false);
  };

  // Função para executar busca com filtros
  const handleFilterSearch = async () => {
    console.log('handleFilterSearch disparado');
    setLoading(true);
    
    try {
      // Se não há termo de busca, buscar todos os produtos
      const searchTerm = searchValue || '';
      const prod = await fetchProducts(searchTerm);
      console.log('Produtos recebidos no handleFilterSearch:', prod);
      console.log('Filtros sendo aplicados:', filters);
      
      const filteredProducts = applyFilters(prod);
      console.log('Produtos após aplicar filtros:', filteredProducts);
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Erro na busca:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  // Função para limpar filtros
  const handleClearFilters = () => {
    setFilters({
      selectedFilters: [],
      priceRange: ''
    });
    
    // Executar nova busca sem filtros
    if (searchValue) {
      handleFilterSearch();
    }
  };

  // Função para lidar com mudança de filtro individual
  const handleFilterChange = (filterValue: string) => {
    const newSelectedFilters = filters.selectedFilters.includes(filterValue)
      ? filters.selectedFilters.filter(f => f !== filterValue)
      : [...filters.selectedFilters, filterValue];
    
    setFilters({
      ...filters,
      selectedFilters: newSelectedFilters
    });
  };

  // Função para lidar com mudança de preço
  const handlePriceChange = (priceRange: string) => {
    setFilters({
      ...filters,
      priceRange
    });
  };

  return (
    <>
      <h2 className="busque">Busque</h2>
      
      {/* Barra de Busca */}
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

      {/* Filtros integrados */}
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
          {/* Filtro por Categoria */}
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

          {/* Filtro por Modalidade */}
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

          {/* Filtro por Preço */}
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

        {/* Botão de buscar */}
        <button 
          className="search-button"
          onClick={handleFilterSearch}
          type="button"
        >
          Buscar
        </button>
      </div>

      {/* Lista de produtos */}
      <ProductsSearch />
    </>
  );
}