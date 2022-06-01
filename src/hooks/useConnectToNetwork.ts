import { useWeb3React } from "@web3-react/core"

export const networkParams = {
  chainId: process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID,
  rpcUrls: [process.env.NEXT_PUBLIC_NETWORK_RPC_URL],
  chainName: process.env.NEXT_PUBLIC_NETWORK_CHAIN_NAME,
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_NAME,
    symbol: process.env.NEXT_PUBLIC_NETWORK_CURRENCY_SYMBOL,
    decimals: 18,
  },
  blockExplorerUrls: [process.env.NEXT_PUBLIC_NETWORK_BLOCK_EXPLORER_URL],
}

export const useConnectToNetwork = () => {
  const { library } = useWeb3React()
  const connectToNetwork = async () => {
    if(!library) return

    try {
      await library.provider.request({
        method: 'wallet_addEthereumChain',
        params: [networkParams]
      })
    } catch (error) {
      console.log(error)
      alert(`ネットワークの接続に失敗しました。`)
    }
  }

  return { connectToNetwork }
}
