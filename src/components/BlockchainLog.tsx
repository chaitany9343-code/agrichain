import React from 'react';
import { Hash, Clock, Zap, ArrowRight } from 'lucide-react';
import { Transaction } from '../types';

interface BlockchainLogProps {
  transactions: Transaction[];
}

const BlockchainLog: React.FC<BlockchainLogProps> = ({ transactions }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Blockchain Transaction Log</h2>
        <p className="text-gray-600">Recent blockchain transactions for supply chain events</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {transactions.slice(-10).reverse().map((transaction) => (
            <div key={transaction.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-150">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Hash className="w-4 h-4 text-blue-600" />
                    <span className="font-mono text-sm text-gray-700">{truncateHash(transaction.id)}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Block #{transaction.blockNumber}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-900">{transaction.action}</span>
                    <span className="text-sm text-gray-500 ml-2">for {transaction.productId}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDate(transaction.timestamp)}
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      {transaction.gasUsed} gas
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">From:</span>
                    <span className="font-medium text-gray-900">{transaction.from}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">To:</span>
                    <span className="font-medium text-gray-900">{transaction.to}</span>
                  </div>
                </div>
                
                <div className="ml-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockchainLog;