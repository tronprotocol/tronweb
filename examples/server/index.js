const TronWeb = require('../../dist/TronWeb.node.js'); // require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider('http://159.69.37.73:8090');
const solidityNode = new HttpProvider('http://159.69.37.73:8091');
const eventServer = 'http://47.90.203.178:18891';
const privateKey = 'D053CA8A0FFD6F284D2FE67FC0CCE0E59D109D09A3D271DB4E2C1C64AD760806';

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode, 
        solidityNode, 
        eventServer,
        privateKey
    );

    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([ name, connected ]) => {
        if(!connected)
            console.error(`Error: ${name} is not connected`);

        return connected;
    }).includes(false);

    if(!connected)
        return;

    const account = await tronWeb.createAccount();
    const isValid = tronWeb.isAddress(account.address.hex);

    console.group('\nGenerated account');
        console.log('- Private Key:', account.privateKey);
        console.log('- Public Key: ', account.publicKey);
        console.group('Address')
            console.log('- Base58:', account.address.base58);
            console.log('- Hex:   ', account.address.hex);
            console.log('- Valid: ', isValid, '\n')
        console.groupEnd();
    console.groupEnd();
};

app();