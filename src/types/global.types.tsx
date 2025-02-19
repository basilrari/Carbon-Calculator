import React from 'react';

// Wallet and BuyCharComponentState interfaces
export interface WalletResponse {
  amount: number;
}

export interface BuyCharComponentState {
  quantity: number;
  price: number;
  walletAmount: number;
  loading: boolean;
}

// Carbon asset-related types
export type carbonassetprops = {
  date: string;
  quantity: number;
  project: string;
  price: number;
  status: 'current' | 'sold';
};

export type carbonAssetArray = carbonassetprops[];

export type Individualassetprops = {
  id: number;
  date: string;
  quantity: number;
  project: string;
  price: number;
};

export type MyAssetArray = Individualassetprops[];

export type NewIndividualassetprops = Individualassetprops & {
  onSelectionChange: (data: Individualassetprops | number) => void;
};

export type retirementprops = {
  date: Date;
  quantity: number;
  project: string;
  price: number;
};

// Aggregation data interfaces
export interface AggregateDataProps {
  totalQuantity: number | undefined;
  totalPrice: number | undefined;
  selectedCount: number | undefined;
}

export interface onAggregatedDataProps {
  onAggregatedData: (data: AggregateDataProps) => void;
}