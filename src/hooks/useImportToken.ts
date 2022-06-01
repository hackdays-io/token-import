import { useWeb3React } from "@web3-react/core"

export const tokenParams = {
  type: 'ERC20',
  options: {
    address: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    symbol: process.env.NEXT_PUBLIC_TOKEN_SYMBOL,
    decimals: 18
  }
}

export const useImportToken = () => {
  const { library } = useWeb3React()
  const importToken = async () => {
    if(!library) return

    try {
      return await library.provider.request({
        method: 'wallet_watchAsset',
        params: tokenParams
      })
    } catch (error) {
      console.log(error)
      alert(`${tokenParams.options.symbol}トークンのインポートに失敗しました。`)
    }
  }

  return { importToken }
}
