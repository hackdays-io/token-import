declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: true
    }
  }
}

export {}
