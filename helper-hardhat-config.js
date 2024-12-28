
const networkConfig = {
    31337: {
      name: "localhost",
      wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      daiToken: "0x6b175474e89094c44da98b954eedeac495271d0f",

    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/data-feeds/price-feeds/addresses
    11155111: {
      name: "sepolia",
      ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
  }
  const INITIAL_SUPPLY = "1000000000000000000000000"
  
  const developmentChains = ["hardhat", "localhost"]
  
  module.exports = {
    networkConfig,
    developmentChains,
    INITIAL_SUPPLY,
  }
  