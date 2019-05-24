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
        bytecode: "0x608060405234801561001057600080fd5b50d3801561001d57600080fd5b50d2801561002a57600080fd5b5060e5806100396000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307fb8ea6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b50608e600480360381019080803590602001909291908035906020019092919050505060a4565b6040518082815260200191505060405180910390f35b600080600190508284820101915050929150505600a165627a7a72305820ba2dba126dd3285cfaee13187fa53bf7d9bc09517d6afd04cd7d71098a1f90ee0029",
        "deployedBytecode": "0x608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806307fb8ea6146044575b600080fd5b348015604f57600080fd5b50d38015605b57600080fd5b50d28015606757600080fd5b50608e600480360381019080803590602001909291908035906020019092919050505060a4565b6040518082815260200191505060405180910390f35b600080600190508284820101915050929150505600a165627a7a72305820ba2dba126dd3285cfaee13187fa53bf7d9bc09517d6afd04cd7d71098a1f90ee0029",
        "sourceMap": "26:150:1:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:150:1;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:150:1;;8:9:-1;5:2;;;30:1;27;20:12;5:2;26:150:1;;;;;;;",
        "deployedSourceMap": "26:150:1:-;;;;;;;;;;;;;;;;;;;;;;;;59:115;;8:9:-1;5:2;;;30:1;27;20:12;5:2;59:115:1;;8:9:-1;5:2;;;30:1;27;20:12;5:2;59:115:1;;8:9:-1;5:2;;;30:1;27;20:12;5:2;59:115:1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;119:9;136;146:1;136:11;;168:1;164;160;:5;:9;153:16;;59:115;;;;;:::o",
        "source": "pragma solidity ^0.4.23;\n\ncontract testConstantContract{\n  function testPure(uint256 x,uint256 y) public pure returns (uint256 z) {\n    uint256 i=1;\n    return i + x + y;\n  }\n}\n",
        "sourcePath": "/Users/jackieshen/tron/tronworkspace/tron-box-deploy/contracts/testConstantContract.sol",
        "ast": {
            "absolutePath": "/Users/jackieshen/tron/tronworkspace/tron-box-deploy/contracts/testConstantContract.sol",
            "exportedSymbols": {
                "testConstantContract": [
                    79
                ]
            },
            "id": 80,
            "nodeType": "SourceUnit",
            "nodes": [
                {
                    "id": 58,
                    "literals": [
                        "solidity",
                        "^",
                        "0.4",
                        ".23"
                    ],
                    "nodeType": "PragmaDirective",
                    "src": "0:24:1"
                },
                {
                    "baseContracts": [],
                    "contractDependencies": [],
                    "contractKind": "contract",
                    "documentation": null,
                    "fullyImplemented": true,
                    "id": 79,
                    "linearizedBaseContracts": [
                        79
                    ],
                    "name": "testConstantContract",
                    "nodeType": "ContractDefinition",
                    "nodes": [
                        {
                            "body": {
                                "id": 77,
                                "nodeType": "Block",
                                "src": "130:44:1",
                                "statements": [
                                    {
                                        "assignments": [
                                            68
                                        ],
                                        "declarations": [
                                            {
                                                "constant": false,
                                                "id": 68,
                                                "name": "i",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 78,
                                                "src": "136:9:1",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "typeName": {
                                                    "id": 67,
                                                    "name": "uint256",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "136:7:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "value": null,
                                                "visibility": "internal"
                                            }
                                        ],
                                        "id": 70,
                                        "initialValue": {
                                            "argumentTypes": null,
                                            "hexValue": "31",
                                            "id": 69,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "146:1:1",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_1_by_1",
                                                "typeString": "int_const 1"
                                            },
                                            "value": "1"
                                        },
                                        "nodeType": "VariableDeclarationStatement",
                                        "src": "136:11:1"
                                    },
                                    {
                                        "expression": {
                                            "argumentTypes": null,
                                            "commonType": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            },
                                            "id": 75,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "leftExpression": {
                                                "argumentTypes": null,
                                                "commonType": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "id": 73,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "leftExpression": {
                                                    "argumentTypes": null,
                                                    "id": 71,
                                                    "name": "i",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 68,
                                                    "src": "160:1:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "nodeType": "BinaryOperation",
                                                "operator": "+",
                                                "rightExpression": {
                                                    "argumentTypes": null,
                                                    "id": 72,
                                                    "name": "x",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 60,
                                                    "src": "164:1:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "src": "160:5:1",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            },
                                            "nodeType": "BinaryOperation",
                                            "operator": "+",
                                            "rightExpression": {
                                                "argumentTypes": null,
                                                "id": 74,
                                                "name": "y",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 62,
                                                "src": "168:1:1",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            },
                                            "src": "160:9:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "functionReturnParameters": 66,
                                        "id": 76,
                                        "nodeType": "Return",
                                        "src": "153:16:1"
                                    }
                                ]
                            },
                            "documentation": null,
                            "id": 78,
                            "implemented": true,
                            "isConstructor": false,
                            "isDeclaredConst": true,
                            "modifiers": [],
                            "name": "testPure",
                            "nodeType": "FunctionDefinition",
                            "parameters": {
                                "id": 63,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 60,
                                        "name": "x",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "77:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 59,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "77:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 62,
                                        "name": "y",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "87:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 61,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "87:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "76:21:1"
                            },
                            "payable": false,
                            "returnParameters": {
                                "id": 66,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 65,
                                        "name": "z",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "119:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 64,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "119:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "118:11:1"
                            },
                            "scope": 79,
                            "src": "59:115:1",
                            "stateMutability": "pure",
                            "superFunction": null,
                            "visibility": "public"
                        }
                    ],
                    "scope": 80,
                    "src": "26:150:1"
                }
            ],
            "src": "0:177:1"
        },
        "legacyAST": {
            "absolutePath": "/Users/jackieshen/tron/tronworkspace/tron-box-deploy/contracts/testConstantContract.sol",
            "exportedSymbols": {
                "testConstantContract": [
                    79
                ]
            },
            "id": 80,
            "nodeType": "SourceUnit",
            "nodes": [
                {
                    "id": 58,
                    "literals": [
                        "solidity",
                        "^",
                        "0.4",
                        ".23"
                    ],
                    "nodeType": "PragmaDirective",
                    "src": "0:24:1"
                },
                {
                    "baseContracts": [],
                    "contractDependencies": [],
                    "contractKind": "contract",
                    "documentation": null,
                    "fullyImplemented": true,
                    "id": 79,
                    "linearizedBaseContracts": [
                        79
                    ],
                    "name": "testConstantContract",
                    "nodeType": "ContractDefinition",
                    "nodes": [
                        {
                            "body": {
                                "id": 77,
                                "nodeType": "Block",
                                "src": "130:44:1",
                                "statements": [
                                    {
                                        "assignments": [
                                            68
                                        ],
                                        "declarations": [
                                            {
                                                "constant": false,
                                                "id": 68,
                                                "name": "i",
                                                "nodeType": "VariableDeclaration",
                                                "scope": 78,
                                                "src": "136:9:1",
                                                "stateVariable": false,
                                                "storageLocation": "default",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "typeName": {
                                                    "id": 67,
                                                    "name": "uint256",
                                                    "nodeType": "ElementaryTypeName",
                                                    "src": "136:7:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "value": null,
                                                "visibility": "internal"
                                            }
                                        ],
                                        "id": 70,
                                        "initialValue": {
                                            "argumentTypes": null,
                                            "hexValue": "31",
                                            "id": 69,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": true,
                                            "kind": "number",
                                            "lValueRequested": false,
                                            "nodeType": "Literal",
                                            "src": "146:1:1",
                                            "subdenomination": null,
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_rational_1_by_1",
                                                "typeString": "int_const 1"
                                            },
                                            "value": "1"
                                        },
                                        "nodeType": "VariableDeclarationStatement",
                                        "src": "136:11:1"
                                    },
                                    {
                                        "expression": {
                                            "argumentTypes": null,
                                            "commonType": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            },
                                            "id": 75,
                                            "isConstant": false,
                                            "isLValue": false,
                                            "isPure": false,
                                            "lValueRequested": false,
                                            "leftExpression": {
                                                "argumentTypes": null,
                                                "commonType": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                },
                                                "id": 73,
                                                "isConstant": false,
                                                "isLValue": false,
                                                "isPure": false,
                                                "lValueRequested": false,
                                                "leftExpression": {
                                                    "argumentTypes": null,
                                                    "id": 71,
                                                    "name": "i",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 68,
                                                    "src": "160:1:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "nodeType": "BinaryOperation",
                                                "operator": "+",
                                                "rightExpression": {
                                                    "argumentTypes": null,
                                                    "id": 72,
                                                    "name": "x",
                                                    "nodeType": "Identifier",
                                                    "overloadedDeclarations": [],
                                                    "referencedDeclaration": 60,
                                                    "src": "164:1:1",
                                                    "typeDescriptions": {
                                                        "typeIdentifier": "t_uint256",
                                                        "typeString": "uint256"
                                                    }
                                                },
                                                "src": "160:5:1",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            },
                                            "nodeType": "BinaryOperation",
                                            "operator": "+",
                                            "rightExpression": {
                                                "argumentTypes": null,
                                                "id": 74,
                                                "name": "y",
                                                "nodeType": "Identifier",
                                                "overloadedDeclarations": [],
                                                "referencedDeclaration": 62,
                                                "src": "168:1:1",
                                                "typeDescriptions": {
                                                    "typeIdentifier": "t_uint256",
                                                    "typeString": "uint256"
                                                }
                                            },
                                            "src": "160:9:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "functionReturnParameters": 66,
                                        "id": 76,
                                        "nodeType": "Return",
                                        "src": "153:16:1"
                                    }
                                ]
                            },
                            "documentation": null,
                            "id": 78,
                            "implemented": true,
                            "isConstructor": false,
                            "isDeclaredConst": true,
                            "modifiers": [],
                            "name": "testPure",
                            "nodeType": "FunctionDefinition",
                            "parameters": {
                                "id": 63,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 60,
                                        "name": "x",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "77:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 59,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "77:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    },
                                    {
                                        "constant": false,
                                        "id": 62,
                                        "name": "y",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "87:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 61,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "87:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "76:21:1"
                            },
                            "payable": false,
                            "returnParameters": {
                                "id": 66,
                                "nodeType": "ParameterList",
                                "parameters": [
                                    {
                                        "constant": false,
                                        "id": 65,
                                        "name": "z",
                                        "nodeType": "VariableDeclaration",
                                        "scope": 78,
                                        "src": "119:9:1",
                                        "stateVariable": false,
                                        "storageLocation": "default",
                                        "typeDescriptions": {
                                            "typeIdentifier": "t_uint256",
                                            "typeString": "uint256"
                                        },
                                        "typeName": {
                                            "id": 64,
                                            "name": "uint256",
                                            "nodeType": "ElementaryTypeName",
                                            "src": "119:7:1",
                                            "typeDescriptions": {
                                                "typeIdentifier": "t_uint256",
                                                "typeString": "uint256"
                                            }
                                        },
                                        "value": null,
                                        "visibility": "internal"
                                    }
                                ],
                                "src": "118:11:1"
                            },
                            "scope": 79,
                            "src": "59:115:1",
                            "stateMutability": "pure",
                            "superFunction": null,
                            "visibility": "public"
                        }
                    ],
                    "scope": 80,
                    "src": "26:150:1"
                }
            ],
            "src": "0:177:1"
        },
        "compiler": {
            "name": "solc",
            "version": "0.4.25+commit.69a1e720.Emscripten.clang"
        },
        "networks": {},
        "schemaVersion": "2.0.1",
        "updatedAt": "2019-05-24T00:26:53.377Z"
    }
}
