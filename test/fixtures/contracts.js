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
    },
    rawParam: {
        /*
            pragma solidity ^0.4.18;
            contract rawParam {
                uint256 public check;

                constructor(uint256 _check) public {
                    check = _check;
                }

                function setCheck(uint256 _check) public {
                    check = _check;
                }
            }
        */
        contractName: "rawParam",
        abi: [
            {
                constant: false,
                inputs: [
                    {
                        name: "_check",
                        type: "uint256",
                    },
                ],
                name: "setCheck",
                outputs: [],
                payable: false,
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                constant: true,
                inputs: [],
                name: "check",
                outputs: [
                    {
                        name: "",
                        type: "uint256",
                    },
                ],
                payable: false,
                stateMutability: "view",
                type: "function",
            },
        ],
        bytecode:
            "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    funcABIV2: {
      /*
          pragma solidity ^0.4.18;
          contract funcABIV2 {
              uint256 public check;

              constructor(uint256 _check) public {
                  check = _check;
              }

              function setCheck(uint256 _check) public {
                  check = _check;
              }
          }
      */
      contractName: "funcABIV2",
      abi: [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_check",
              "type": "uint256"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "check",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "_check",
              "type": "uint256"
            }
          ],
          "name": "setCheck",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode:
          "0x608060405234801561001057600080fd5b5060405160208061012583398101806040528101908080519060200190929190505050806000819055505060dc806100496000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c948bd214604e578063919840ad146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60aa565b6040518082815260200191505060405180910390f35b8060008190555050565b600054815600a165627a7a7230582084a638eb1bcab674b68b98bc8407c96a2e186016c5da95ffcf421c1d40d0feb60029",
    },
    funcABIV2_2: {
      "bytecode": "0x6060604052341561000f57600080fd5b6102888061001e6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
      "result": "0x0000000000000000000000001d39a67ed2fcff49d955aefef526e36995453e870000000000000000000000001a8d6d77ba7102532ce756c64ecbd6d20b36257f000000000000000000000000cfff478412982dc11d3700747fa1972815853776",
      "interface": "[{\"constant\":true,\"inputs\":[],\"name\":\"test\",\"outputs\":[{\"components\":[{\"name\":\"a\",\"type\":\"address\"},{\"name\":\"b\",\"type\":\"address\"},{\"name\":\"c\",\"type\":\"address\"}],\"name\":\"r0\",\"type\":\"tuple\"}],\"payable\":false,\"stateMutability\":\"pure\",\"type\":\"function\"}]",
      "name": "random-0",
      "runtimeBytecode": "0x606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063f8a8fd6d14610046575b600080fd5b341561005157600080fd5b61005961006f565b6040516100669190610213565b60405180910390f35b61007761015e565b731d39a67ed2fcff49d955aefef526e36995453e87816000019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050731a8d6d77ba7102532ce756c64ecbd6d20b36257f816020019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505073cfff478412982dc11d3700747fa1972815853776816040019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505090565b606060405190810160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6101cb8161022e565b82525050565b6060820160008201516101e760008501826101c2565b5060208201516101fa60208501826101c2565b50604082015161020d60408501826101c2565b50505050565b600060608201905061022860008301846101d1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff821690509190505600a265627a7a723058206daa289c202b91f390e524f86617f5aa46ded7b43470b1d039eed33244b373fc6c6578706572696d656e74616cf50037",
      "source": "// Test: random-0\n// Comnpiler: 0.4.18+commit.9cf6e910\n// [{\"type\":\"tuple\",\"name\":\"Struct47985BF5FB\",\"struct\":\"    struct Struct47985BF5FB {\\n        address a;\\n        address b;\\n        address c;\\n    }\\n\",\"value\":[{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"address\",\"name\":\"address\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]\n \npragma experimental ABIEncoderV2;\npragma solidity ^0.4.18;\n\ncontract Test {\n    struct Struct47985BF5FB {\n        address a;\n        address b;\n        address c;\n    }\n\n    function test() pure returns (Struct47985BF5FB r0) {\n        r0.a = address(0x1D39a67eD2fcfF49D955aEfEF526e36995453E87);\n        r0.b = address(0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f);\n        r0.c = address(0xcFfF478412982dc11d3700747FA1972815853776);\n    }\n}\n",
      "types": "[\"tuple(address,address,address)\"]",
      "values": "[{\"type\":\"tuple\",\"value\":[{\"type\":\"string\",\"value\":\"0x1D39a67eD2fcfF49D955aEfEF526e36995453E87\"},{\"type\":\"string\",\"value\":\"0x1a8D6D77ba7102532CE756c64EcBd6d20B36257f\"},{\"type\":\"string\",\"value\":\"0xcFfF478412982dc11d3700747FA1972815853776\"}]}]",
      "version": "0.4.18+commit.9cf6e910"
    },
    funcABIV2_3: {
      /*
        pragma experimental ABIEncoderV2;
        contract Test {
          struct Struct47985BF5FB {
            address a;
            address b;
            address c;
          }
          mapping (uint256 => Struct47985BF5FB) public s;

          function setStruct(Struct47985BF5FB calldata _s)  public {
            s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
          }

          function get1() public view returns(Struct47985BF5FB memory s2){
              s2 = s[0];

          }
      */
      contractName: "funcABIV2_3",
      abi: [
        {
          "inputs": [],
          "name": "get1",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "b",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "c",
                  "type": "address"
                }
              ],
              "internalType": "struct Test.Struct47985BF5FB",
              "name": "s2",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "s",
          "outputs": [
            {
              "internalType": "address",
              "name": "a",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "b",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "c",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "b",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "c",
                  "type": "address"
                }
              ],
              "internalType": "struct Test.Struct47985BF5FB",
              "name": "_s",
              "type": "tuple"
            }
          ],
          "name": "setStruct",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode:
          "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106bd8061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c8063054c1a75146100605780630de3848f1461007e57806352efd6851461009a575b600080fd5b6100686100cc565b60405161007591906105d7565b60405180910390f35b610098600480360381019061009391906104e6565b6101f8565b005b6100b460048036038101906100af9190610513565b610378565b6040516100c3939291906105a0565b60405180910390f35b6100d4610402565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b604051806060016040528082600001602081019061021691906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182602001602081019061024491906104b9565b73ffffffffffffffffffffffffffffffffffffffff16815260200182604001602081019061027291906104b9565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b60008135905061047481610659565b61047d816105f2565b905092915050565b60006060828403121561049b5761049a61064f565b5b81905092915050565b6000813590506104b381610670565b92915050565b6000602082840312156104cf576104ce610654565b5b60006104dd84828501610465565b91505092915050565b6000606082840312156104fc576104fb610654565b5b600061050a84828501610485565b91505092915050565b60006020828403121561052957610528610654565b5b6000610537848285016104a4565b91505092915050565b610549816105f2565b82525050565b610558816105f2565b82525050565b6060820160008201516105746000850182610540565b5060208201516105876020850182610540565b50604082015161059a6040850182610540565b50505050565b60006060820190506105b5600083018661054f565b6105c2602083018561054f565b6105cf604083018461054f565b949350505050565b60006060820190506105ec600083018461055e565b92915050565b60006105fd82610604565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b61066281610624565b811461066d57600080fd5b50565b61067981610645565b811461068457600080fd5b5056fea26474726f6e5822122033b02c1792f1c2b017ea3cc155a5c31bdd6eff931f11f2a9095eb6c3bfc56c9764736f6c63430008060033",
    },
    funcABIV2_4: {
      /*
        pragma experimental ABIEncoderV2;
        contract Test {
          struct Struct47985BF5FB {
            address a;
            trcToken b;
            address c;
          }
          mapping (uint256 => Struct47985BF5FB) public s;

          function setStruct(Struct47985BF5FB calldata _s)  public {
            s[0] = Struct47985BF5FB(_s.a,_s.b,_s.c);
          }

          function get() public view returns(Struct47985BF5FB memory s2){
              s2 = s[0];
          }

        }
      */
      contractName: "funcABIV2_4",
      abi: [
        {
          "inputs": [],
          "name": "get",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
                },
                {
                  "internalType": "trcToken",
                  "name": "b",
                  "type": "trcToken"
                },
                {
                  "internalType": "address",
                  "name": "c",
                  "type": "address"
                }
              ],
              "internalType": "struct Test.Struct47985BF5FB",
              "name": "s2",
              "type": "tuple"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "s",
          "outputs": [
            {
              "internalType": "address",
              "name": "a",
              "type": "address"
            },
            {
              "internalType": "trcToken",
              "name": "b",
              "type": "trcToken"
            },
            {
              "internalType": "address",
              "name": "c",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "a",
                  "type": "address"
                },
                {
                  "internalType": "trcToken",
                  "name": "b",
                  "type": "trcToken"
                },
                {
                  "internalType": "address",
                  "name": "c",
                  "type": "address"
                }
              ],
              "internalType": "struct Test.Struct47985BF5FB",
              "name": "_s",
              "type": "tuple"
            }
          ],
          "name": "setStruct",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      bytecode:
          "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506106028061003a6000396000f3fe608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b506004361061005b5760003560e01c806352efd685146100605780635aeccbe6146100925780636d4ce63c146100ae575b600080fd5b61007a60048036038101906100759190610430565b6100cc565b604051610089939291906104db565b60405180910390f35b6100ac60048036038101906100a79190610403565b610136565b005b6100b6610255565b6040516100c39190610512565b60405180910390f35b60006020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b604051806060016040528082600001602081019061015491906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681526020018260200135815260200182604001602081019061018c91906103d6565b73ffffffffffffffffffffffffffffffffffffffff1681525060008080815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555090505050565b61025d610335565b6000808081526020019081526020016000206040518060600160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050905090565b6040518060600160405280600073ffffffffffffffffffffffffffffffffffffffff16815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b6000813590506103918161059e565b61039a8161052d565b905092915050565b6000606082840312156103b8576103b7610594565b5b81905092915050565b6000813590506103d0816105b5565b92915050565b6000602082840312156103ec576103eb610599565b5b60006103fa84828501610382565b91505092915050565b60006060828403121561041957610418610599565b5b6000610427848285016103a2565b91505092915050565b60006020828403121561044657610445610599565b5b6000610454848285016103c1565b91505092915050565b6104668161052d565b82525050565b6104758161052d565b82525050565b606082016000820151610491600085018261045d565b5060208201516104a460208501826104bd565b5060408201516104b7604085018261045d565b50505050565b6104c68161053f565b82525050565b6104d58161053f565b82525050565b60006060820190506104f0600083018661046c565b6104fd60208301856104cc565b61050a604083018461046c565b949350505050565b6000606082019050610527600083018461047b565b92915050565b600061053882610549565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600074ffffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600080fd5b600080fd5b6105a781610569565b81146105b257600080fd5b50565b6105be8161058a565b81146105c957600080fd5b5056fea26474726f6e5822122003e6f6fe8adb4a16e48e773436d2d36d3bcf3d16227953199ec68896e85b82b264736f6c63430008060033",
    }
}
