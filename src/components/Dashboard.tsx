import React, { useState } from 'react';
import { Plus, Eye, Edit, Package, Truck, Store, Building, Clock, DollarSign, Hash, User, Calendar } from 'lucide-react';
import ProductRegistrationForm from './ProductRegistrationForm';
import ProductUpdateForm from './ProductUpdateForm';
import ProductTrackingTable from './ProductTrackingTable';
import BlockchainLog from './BlockchainLog';
import { Product, Transaction } from '../types';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD001",
      name: "Organic Tomatoes",
      farmerName: "John Smith",
      dateOfProduction: "2024-01-15",
      currentOwner: "Fresh Farms Warehouse",
      currentStatus: "warehouse",
      timestamp: "2024-01-16T10:30:00Z",
      journey: [
        { status: "farmer", owner: "John Smith", timestamp: "2024-01-15T08:00:00Z", location: "Farm A1" },
        { status: "warehouse", owner: "Fresh Farms Warehouse", timestamp: "2024-01-16T10:30:00Z", location: "Warehouse District" }
      ],
      predictedPrice: 45.50
    },
    {
      id: "PROD002",
      name: "Premium Apples",
      farmerName: "Sarah Johnson",
      dateOfProduction: "2024-01-14",
      currentOwner: "City Market",
      currentStatus: "market",
      timestamp: "2024-01-17T14:20:00Z",
      journey: [
        { status: "farmer", owner: "Sarah Johnson", timestamp: "2024-01-14T07:15:00Z", location: "Orchard B2" },
        { status: "warehouse", owner: "Fresh Farms Warehouse", timestamp: "2024-01-15T11:45:00Z", location: "Warehouse District" },
        { status: "distributor", owner: "QuickDistrib Co.", timestamp: "2024-01-16T16:30:00Z", location: "Distribution Center" },
        { status: "market", owner: "City Market", timestamp: "2024-01-17T14:20:00Z", location: "Downtown Market" }
      ],
      predictedPrice: 32.75
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "0x1a2b3c4d",
      productId: "PROD001",
      action: "Product Registered",
      from: "System",
      to: "John Smith",
      timestamp: "2024-01-15T08:00:00Z",
      blockNumber: 1234567,
      gasUsed: "21000"
    },
    {
      id: "0x2b3c4d5e",
      productId: "PROD001",
      action: "Status Updated to Warehouse",
      from: "John Smith",
      to: "Fresh Farms Warehouse",
      timestamp: "2024-01-16T10:30:00Z",
      blockNumber: 1234568,
      gasUsed: "45000"
    }
  ]);

  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const handleAddProduct = (productData: Omit<Product, 'id' | 'currentOwner' | 'currentStatus' | 'timestamp' | 'journey' | 'predictedPrice'>) => {
    const newProduct: Product = {
      ...productData,
      id: `PROD${String(products.length + 1).padStart(3, '0')}`,
      currentOwner: productData.farmerName,
      currentStatus: 'farmer',
      timestamp: new Date().toISOString(),
      journey: [{
        status: 'farmer',
        owner: productData.farmerName,
        timestamp: new Date().toISOString(),
        location: 'Farm Location'
      }],
      predictedPrice: Math.round((Math.random() * 50 + 20) * 100) / 100
    };

    setProducts([...products, newProduct]);
    
    // Add blockchain transaction
    const newTransaction: Transaction = {
      id: `0x${Math.random().toString(16).substr(2, 8)}`,
      productId: newProduct.id,
      action: "Product Registered",
      from: "System",
      to: newProduct.farmerName,
      timestamp: new Date().toISOString(),
      blockNumber: Math.floor(Math.random() * 1000000) + 1234567,
      gasUsed: "21000"
    };

    setTransactions([...transactions, newTransaction]);
    setShowRegistrationForm(false);
  };

  const handleUpdateStatus = (productId: string, newStatus: string, newOwner: string) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newJourneyEntry = {
          status: newStatus as any,
          owner: newOwner,
          timestamp: new Date().toISOString(),
          location: getLocationForStatus(newStatus)
        };

        return {
          ...product,
          currentOwner: newOwner,
          currentStatus: newStatus as any,
          timestamp: new Date().toISOString(),
          journey: [...product.journey, newJourneyEntry]
        };
      }
      return product;
    });

    setProducts(updatedProducts);

    // Add blockchain transaction
    const newTransaction: Transaction = {
      id: `0x${Math.random().toString(16).substr(2, 8)}`,
      productId: productId,
      action: `Status Updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      from: products.find(p => p.id === productId)?.currentOwner || "Unknown",
      to: newOwner,
      timestamp: new Date().toISOString(),
      blockNumber: Math.floor(Math.random() * 1000000) + 1234567,
      gasUsed: Math.floor(Math.random() * 50000 + 30000).toString()
    };

    setTransactions([...transactions, newTransaction]);
    setShowUpdateForm(false);
    setSelectedProductId('');
  };

  const getLocationForStatus = (status: string) => {
    switch (status) {
      case 'warehouse': return 'Warehouse District';
      case 'distributor': return 'Distribution Center';
      case 'market': return 'Retail Location';
      default: return 'Unknown Location';
    }
  };

  const handleUpdateClick = (productId: string) => {
    setSelectedProductId(productId);
    setShowUpdateForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">SupplyChain Tracker</h1>
          </div>
          <p className="text-gray-600">Blockchain-powered supply chain transparency and traceability</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
          <button
            onClick={() => setShowUpdateForm(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
          >
            <Edit className="w-5 h-5" />
            Update Status
          </button>
          <button className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-sm">
            <Eye className="w-5 h-5" />
            View Products
          </button>
        </div>

        {/* Product Tracking Table */}
        <ProductTrackingTable 
          products={products} 
          onUpdateClick={handleUpdateClick}
        />

        {/* Blockchain Transaction Log */}
        <BlockchainLog transactions={transactions} />

        {/* Modals */}
        {showRegistrationForm && (
          <ProductRegistrationForm
            onSubmit={handleAddProduct}
            onClose={() => setShowRegistrationForm(false)}
          />
        )}

        {showUpdateForm && (
          <ProductUpdateForm
            products={products}
            selectedProductId={selectedProductId}
            onSubmit={handleUpdateStatus}
            onClose={() => {
              setShowUpdateForm(false);
              setSelectedProductId('');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;