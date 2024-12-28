const { getNamedAccounts, ethers } = require("hardhat");
const { getWeth,AMOUNT } = require("./getWeth");
const { networkConfig } = require("../helper-hardhat-config")

const BORROW_MODE = 2

//Main Function
async function main() {
    await getWeth()
    const {deployer} = await getNamedAccounts()
    //0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    const wethTokenAddress = networkConfig[network.config.chainId].wethToken
    const daiAddress =    networkConfig[network.config.chainId].daiToken

    
const lendingPool = await getLendingPool(deployer)
console.log(`LendingPool Address ${lendingPool.address}`)

//deposit?? approve the token first
//approve
await approveERC20(wethTokenAddress, lendingPool.address, AMOUNT, deployer )
//deposit
console.log("Depositing....")
await lendingPool.deposit(wethTokenAddress,AMOUNT,deployer,0)
console.log("Deposited!!!")
let {availableBorrowsETH, totalDebtETH} = await getBorrowUserData(
    lendingPool, 
    deployer
)
const daiPrice = await getDaiPrice()
const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)
await borrowDai(
    daiAddress,
    amountDaiToBorrowWei,
    lendingPool,
    deployer
)
await getBorrowUserData(
    lendingPool, 
    deployer
)
await repay(
daiAddress,
AMOUNT,
lendingPool,
deployer
)
await getBorrowUserData(
    lendingPool, 
    deployer
)

}

async function repay(daiAddress,amount,lendingPool,account) {
    await approveERC20(daiAddress,lendingPool,amount,account)
    const repayTx = await lendingPool.repay(daiAddress,amount,1,account)
    await repayTx.wait(1)
    console.log("Repaid!!")
}

async function borrowDai(daiAddress, amountDaiToBorrow, lendingPool, account) {
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrow, BORROW_MODE, 0, account)
    await borrowTx.wait(1)
}

async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        account
    )
    console.log("Connected to LendingPoolAddressesProvider at:", lendingPoolAddressesProvider.address);

    const lendingPoolAddress = await lendingPoolAddressesProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)
    return lendingPool
}

async function approveERC20(
    erc20Address,
    spenderAddress,
    amountToSpend,
    account
) {
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20Address,
        account
    )
    const tx = await erc20Token.approve(spenderAddress,amountToSpend)
    await tx.wait(1)
    console.log("Approved!!!!")
}

async function getBorrowUserData(lendingPool, account) {
    const {totalCollateralETH, totalDebtETH, availableBorrowsETH}= await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed`)
    console.log(`You can Borrow ${availableBorrowsETH} worth of ETH`)
    return {totalCollateralETH, totalDebtETH, availableBorrowsETH }
}

async function getDaiPrice() {
    const DaiETHPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x773616E4d11A78F511299002da57A0a94577F1f4"
    )
    const price = (await DaiETHPriceFeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price}`)
    return price
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })



    // GET THE FUCKING ADDRESS OF LENDINGPOOLADDRESSPROVIDER ***DONE***