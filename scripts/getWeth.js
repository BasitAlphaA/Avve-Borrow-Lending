const { ethers, network, getNamedAccounts } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")


const AMOUNT = ethers.utils.parseEther("0.2")

async function getWeth() {
    const { deployer } = await getNamedAccounts()
    const address = networkConfig[network.config.chainId].wethToken
    console.log("this is address",address)
    const iWeth = await ethers.getContractAt(
        "IWeth",
        address,
        deployer
    )
    const txResponse = await iWeth.deposit({
        value: AMOUNT,
    })
    await txResponse.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}


module.exports = {getWeth, AMOUNT}