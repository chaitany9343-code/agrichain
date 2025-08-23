import React, { useState } from 'react';
import { X, Edit, Package, Building, Truck, Store } from 'lucide-react';
import { Product } from '../types';

interface ProductUpdateFormProps {
  products: Product[];
  selectedProductId: string;
  onSubmit: (productId: string, newStatus: string, newOwner: string) => void;
  onClose: () => void;
}

const ProductUpdateForm: React.FC<ProductUpdateFormProps> = ({ 
  products, 
  selectedProductId, 
  onSubmit, 
  onClose 
}) => {
  const [formData, setFormData] = useState({
    productId: selectedProductId,
    newStatus: '',
    newOwner: ''
  });

  const statusOptions = [
    { value: 'warehouse', label: 'Warehouse', icon: Building },
    { value: 'distributor', label: 'Distributor', icon: Truck },
    { value: 'market', label: 'Market', icon: Store }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.productId && formData.newStatus && formData.newOwner) {
      onSubmit(formData.productId, formData.newStatus, formData.newOwner);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Update Product Status</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-2" />
              Select Product
            </label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Choose a product</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Edit className="w-4 h-4 inline mr-2" />
              New Status
            </label>
            <select
              name="newStatus"
              value={formData.newStatus}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Select status</option>
              {statusOptions.map(option => {
                const IconComponent = option.icon;
                return (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Owner/Handler
            </label>
            <input
              type="text"
              name="newOwner"
              value={formData.newOwner}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter new owner/handler name"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpdateForm;