import Image from 'next/image'
import { Inter } from 'next/font/google'
import { ethers } from 'ethers';
import { useState } from 'react'
import Navbar from '@/components/Navbar';
import MarketplaceAddress from '../contactdata/Marketplace-address.json'
import MarketplaceAbi from '../contactdata/Marketplace.json'
import NFTAddress from '../contactdata/NFT-address.json'
import NFTAbi from '../contactdata/NFT.json'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
   
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    setLoading(false)
  }

  return (
    <div>
     <Navbar web3Handler={web3Handler} account={account}/>
    </div>
  )
}
