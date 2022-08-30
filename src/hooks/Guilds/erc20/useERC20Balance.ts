import ERC20 from 'contracts/ERC20.json';
import { BigNumber } from 'ethers';
import { useContractRead } from 'wagmi';

export const useERC20Balance = (
  contractAddress: string,
  walletAddress: string
) => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: ERC20.abi,
    functionName: 'balanceOf',
    args: [walletAddress],
  });
  return {
    data: data ? BigNumber.from(data) : null,
    isError,
    isLoading,
  };
};