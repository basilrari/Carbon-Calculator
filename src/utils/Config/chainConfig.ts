import { CHAIN_NAMESPACES } from '@web3auth/base';

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaef3", // hex of 44787, Celo Testnet (Alfajores)
  rpcTarget: "https://alfajores-forno.celo-testnet.org", // Celo Testnet RPC
  displayName: "Celo Testnet (Alfajores)",
  blockExplorerUrl: "https://alfajores-blockscout.celo-testnet.org",
  ticker: "CELO",
  tickerName: "Celo",
  logo: "https://cryptologos.cc/logos/celo-celo-logo.png",
};