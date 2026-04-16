// Mock products data
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Dell XPS 15',
    description: 'High-performance laptop with InfinityEdge display. Perfect for professionals and creators.',
    price: 85000,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 10,
    specs: {
      processor: 'Intel Core i7',
      ram: '16GB',
      storage: '512GB SSD',
      display: '15.6" 4K OLED'
    }
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    description: 'Apple M2 Pro chip for next-level performance. Stunning Liquid Retina XDR display.',
    price: 125000,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 5,
    specs: {
      processor: 'Apple M2 Pro',
      ram: '16GB',
      storage: '512GB SSD',
      display: '14.2" Liquid Retina XDR'
    }
  },
  {
    id: '3',
    name: 'HP Pavilion Desktop',
    description: 'Powerful desktop for home and office. Reliable performance for everyday tasks.',
    price: 45000,
    category: 'Desktops',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 15,
    specs: {
      processor: 'Intel Core i5',
      ram: '8GB',
      storage: '1TB HDD',
      display: 'N/A'
    }
  },
  {
    id: '4',
    name: 'Logitech MX Master 3S',
    description: 'Advanced wireless mouse for precision and comfort. Silent clicks and 8K DPI tracking.',
    price: 6500,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 30,
    specs: {
      type: 'Wireless Mouse',
      sensor: '8K DPI',
      battery: 'Rechargeable',
      connectivity: 'Bluetooth/Logi Bolt'
    }
  },
  {
    id: '5',
    name: 'Samsung 27" Odyssey G5',
    description: 'Curved gaming monitor with 144Hz refresh rate. Immersive gaming experience.',
    price: 22000,
    category: 'Monitors',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 8,
    specs: {
      size: '27"',
      resolution: 'QHD 2560x1440',
      refreshRate: '144Hz',
      panel: 'VA'
    }
  },
  {
    id: '6',
    name: 'Asus ROG Strix G16',
    description: 'Gaming laptop with NVIDIA GeForce RTX 4060. High-speed performance for gamers.',
    price: 95000,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600&h=400',
    stock: 4,
    specs: {
      processor: 'Intel Core i9',
      ram: '16GB',
      storage: '1TB SSD',
      graphics: 'RTX 4060'
    }
  }
];

export const productService = {
  getAllProducts: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return MOCK_PRODUCTS;
  },

  getProductById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_PRODUCTS.find(p => p.id === id);
  },

  getProductsByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return MOCK_PRODUCTS.filter(p => p.category === category);
  },

  searchProducts: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery)
    );
  },

  createProduct: async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newProduct = { ...productData, id: Math.random().toString(36).substring(2, 11) };
    MOCK_PRODUCTS.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...productData };
      return MOCK_PRODUCTS[index];
    }
    throw new Error('Product not found');
  },

  deleteProduct: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const index = MOCK_PRODUCTS.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PRODUCTS.splice(index, 1);
      return true;
    }
    return false;
  }
};
