import { InjectedConnector } from "@web3-react/injected-connector"
import { AbstractConnector } from "@web3-react/abstract-connector";

export const useConnectToMetaMask = (activate: (connector: AbstractConnector) => Promise<void>) => {
  const injectedConnector = new InjectedConnector({})
  const connectToMetaMask = async () => {
    try {
      await activate(injectedConnector)
      // setHasMetaMask(true)
    } catch (error) {
      console.log(error)
      alert(`Something went wrong ask admin for help (なんか変だな): ${error}`)
    }
  }

  return { connectToMetaMask }
}
