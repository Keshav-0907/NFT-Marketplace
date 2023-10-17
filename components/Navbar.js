import React from 'react'
import Link from 'next/link'

const Navbar = ({ web3Handler, account }) => {

    return (
        <div class='flex justify-around h-16 items-center bg-orange-300'>
            <div class='font-light'>
                <Link href='/'>NFT-Wala</Link>
            </div>

            <div>
                <ul class='flex space-x-10'>
                    <Link href='/'> Home </Link>
                    <Link href='/create'> Create </Link>
                    <li> My Listed Items </li>
                    <Link href='/myPurchases'> My Purchases </Link>
                    
                </ul>
            </div>

            <div>
                {
                    account ? (
                        <Link href={`https://etherscan.io/address/${account}`} target='_blank'>
                            <button class='bg-orange-600 text-white p-2 rounded-lg hover:cursor-pointer hover:shadow-2xl hover:bg-orange-500'>
                                {account.slice(0,5)+"..."+account.slice(35,40)}
                            </button>
                        </Link>
                    ) : (


                        <div onClick={web3Handler} class='bg-orange-600 text-white p-2 rounded-lg hover:cursor-pointer hover:shadow-2xl hover:bg-orange-500'>
                            Connect Wallet
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar