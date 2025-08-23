import React, { useState } from 'react';
import { Eye, Edit, Clock, User, MapPin, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../types';

interface ProductTrackingTableProps {
  products: Product[];
  onUpdateClick: (productId: string) => void;
}

const ProductTrackingTable: React.FC<ProductTrackingTableProps> = ({ products, onUpdateClick }) => {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      farmer: { bg: 'bg-green-100', text: 'text-green-800', label: 'Farmer' },
      warehouse: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Warehouse' },
      distributor: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Distributor' },
      market: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Market' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.farmer;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const toggleExpanded = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Product Tracking</h2>
        <p className="text-gray-600">Monitor products throughout the supply chain</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Predicted Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <React.Fragment key={product.id}>
                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => toggleExpanded(product.id)}
                        className="mr-3 text-gray-400 hover:text-gray-600"
                      >
                        {expandedProduct === product.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.id}</div>
                        <div className="text-sm text-gray-500">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{product.currentOwner}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(product.currentStatus)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDate(product.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {product.predictedPrice?.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleExpanded(product.id)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onUpdateClick(product.id)}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedProduct === product.id && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 bg-gray-50">
                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 mb-3">Full Journey</h4>
                        <div className="grid gap-3">
                          {product.journey.map((step, index) => (
                            <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {getStatusBadge(step.status)}
                                  <span className="text-sm font-medium text-gray-900">{step.owner}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {formatDate(step.timestamp)}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {step.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTrackingTable;