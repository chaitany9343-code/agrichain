export interface Product {
  id: string;
  name: string;
  farmerName: string;
  dateOfProduction: string;
  currentOwner: string;
  currentStatus: 'farmer' | 'warehouse' | 'distributor' | 'market';
  timestamp: string;
  journey: JourneyStep[];
  predictedPrice?: number;
}

export interface JourneyStep {
  status: 'farmer' | 'warehouse' | 'distributor' | 'market';
  owner: string;
  timestamp: string;
  location: string;
}

export interface Transaction {
  id: string;
  productId: string;
  action: string;
  from: string;
  to: string;
  timestamp: string;
  blockNumber: number;
  gasUsed: string;
}