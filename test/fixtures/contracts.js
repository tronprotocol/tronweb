module.exports = {
    testRevert: {
        /*
        pragma solidity ^0.4.18;
        contract TestRevert {
            address owner;
            constructor() public {
            }
            function setOwner(address addr) public {
                require(addr != 0xb6e447d1d576dE6c7f767C32a649F0AD50aE5975, "Address forbidden :-)");
                // TSeFTBYCy3r2kZNYsj86G6Yz6rsmPdYdFs
                owner = addr;
            }
            function getOwner(uint check) public view returns (address) {
                require(check == 1, "Wrong check");
                return owner;
            }
            function getOwner2(uint check) public view returns (address) {
                require(check == 1);
                return owner;
            }
        }
        */
        contractName: "TestRevert",
        abi: [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "setOwner",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "check",
                        "type": "uint256"
                    }
                ],
                "name": "getOwner2",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b5061037d806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806313af40351461005c578063877333461461009f578063c41a360a1461010c575b600080fd5b34801561006857600080fd5b5061009d600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610179565b005b3480156100ab57600080fd5b506100ca60048036038101908080359060200190929190505050610274565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561011857600080fd5b50610137600480360381019080803590602001909291905050506102ae565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b73b6e447d1d576de6c7f767c32a649f0ad50ae597573ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614151515610231576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260158152602001807f41646472657373206d75737420626520213d203078000000000000000000000081525060200191505060405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600060018214151561028557600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b6000600182141515610328576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f57726f6e6720636865636b00000000000000000000000000000000000000000081525060200191505060405180910390fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690509190505600a165627a7a7230582070775fabe424bfe924ea8b9a9f4863306d35202b9c074f195334273994260ef20029"
    },
    testConstant: {
        contractName: "testConstantContract",
        abi: [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "x",
                        "type": "uint256"
                    },
                    {
                        "name": "y",
                        "type": "uint256"
                    }
                ],
                "name": "testPure",
                "outputs": [
                    {
                        "name": "z",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "pure",
                "type": "function"
            }
        ],
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060e5806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307fb8ea6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b50608e600480360381019080803590602001909291908035906020019092919050505060a4565b6040518082815260200191505060405180910390f35b600080600190508284820101915050929150505600a165627a7a72305820ba2dba126dd3285cfaee13187fa53bf7d9bc09517d6afd04cd7d71098a1f90ee0029"
    },
    testSetVal: {
        "contractName": "SetVal",
        "abi": [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "_val",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "0x60806040526000805534801561001457600080fd5b50d3801561002157600080fd5b50d2801561002e57600080fd5b5060e08061003d6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b1146062575b600080fd5b608b60048036036020811015607657600080fd5b810190808035906020019092919050505060a1565b6040518082815260200191505060405180910390f35b600081600081905550600054905091905056fea165627a7a72305820392f2cf7f1b37873349bf7ce496fb370bc80c6539de204bded6197106c530e700029"
    },
    arrayParam: {
        "contractName": "ArrayParam",
        "abi": [
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "balances",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "name": "addresses",
                        "type": "address[]"
                    },
                    {
                        "name": "initialBalances",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ],
        "bytecode": "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506040516102a83803806102a88339810180604052604081101561004d57600080fd5b81019080805164010000000081111561006557600080fd5b8281019050602081018481111561007b57600080fd5b815185602082028301116401000000008211171561009857600080fd5b505092919060200180516401000000008111156100b457600080fd5b828101905060208101848111156100ca57600080fd5b81518560208202830111640100000000821117156100e757600080fd5b5050929190505050600082511115156100ff57600080fd5b8051825114151561010f57600080fd5b60008090505b825181101561019c57818181518110151561012c57fe5b90602001906020020151600080858481518110151561014757fe5b9060200190602002015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508080600101915050610115565b50505060fb806101ad6000396000f3fe6080604052348015600f57600080fd5b50d38015601b57600080fd5b50d28015602757600080fd5b5060043610605d576000357c01000000000000000000000000000000000000000000000000000000009004806327e235e3146062575b600080fd5b60a160048036036020811015607657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505060b7565b6040518082815260200191505060405180910390f35b6000602052806000526040600020600091509050548156fea165627a7a723058207d447cc574baeda0c964d154c92f29b2c72be467d5118d30741788a8c03c185d0029"
    }
}
