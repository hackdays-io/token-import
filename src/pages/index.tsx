import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Box, Button, Step, Link, StepLabel, Stepper, Typography, NoSsr } from '@mui/material';

import { useConnectToMetaMask } from '../hooks/useConnectToMetaMask';
import { useConnectToNetwork, networkParams } from '../hooks/useConnectToNetwork';
import { useImportToken, tokenParams } from '../hooks/useImportToken';

const Home: NextPage = () => {
  const { chainId, activate, active } = useWeb3React<Web3Provider>()
  const [completed, setCompleted] = useState(false)

  const [activeStep, setActiveStep] = useState(0)
  const { connectToMetaMask } = useConnectToMetaMask(activate)
  const { connectToNetwork } = useConnectToNetwork()
  const { importToken } = useImportToken()

  useEffect(() => {
    const loadProvider = async () => {
      if (!(window && window.ethereum?.isMetaMask)) return
      setActiveStep(1)
      await connectToMetaMask()

      if(!active) return
      setActiveStep(2)

      if(chainId !== parseInt(process.env.NEXT_PUBLIC_NETWORK_CHAIN_ID || '', 16)) return
      setActiveStep(3)
    }
    loadProvider()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, chainId])

  const steps = [
    { label: 'Install MetaMask / メタマスクをインストールする' },
    { label: 'Connect to MetaMask / メタマスクに接続する' },
    { label: `Connect to ${networkParams.chainName} / ${networkParams.chainName}に接続する` },
    { label: `Import ${tokenParams.options.symbol} / ${tokenParams.options.symbol}トークンを追加する` }
  ]

  const stepContent = (step: number) => {
    switch(step) {
      case 0:
        return (
          <>
            <Typography variant="caption">まず初めに、MetaMaskをインストールしてください。</Typography>
            <Link href="https://metamask.io/download" target="_blank" rel="noreferrer">MetaMaskをインストール</Link>
            <div><Button variant="outlined" onClick={() => setActiveStep(1)}>Next</Button></div>
          </>
        )
      case 1:
        return <Button variant="outlined" onClick={connectToMetaMask}>Connect to MetaMask</Button>
      case 2:
        return <Button variant="outlined" onClick={connectToNetwork}>Connect to {networkParams.chainName}</Button>
      case 3:
        return <Button
                  variant="outlined"
                  onClick={() => importToken().then(success => setCompleted(!!success))}
                >Import {tokenParams.options.symbol}</Button>
    }
  }

  return (
    <>
      <NoSsr>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Box sx={{ maxWidth: 450, background: '#424242', padding: '20px', borderRadius: '8px' }}>
            {!completed &&
              <>
                <Typography component="h1" variant="h5" align="center" color="white">
                  Import Token
                </Typography>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel><Typography typography="body2">{step.label}</Typography></StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
                  {stepContent(activeStep)}
                </Box>
              </>}
            {completed &&
            <Typography variant="h5" color="white">
              Thank you!<br />
              You have completed all of steps 
            </Typography>}
          </Box>
        </Box>
      </NoSsr>
    </>
  )
}

export default Home
