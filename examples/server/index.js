const TronWeb = require('../../dist/TronWeb.node.js'); // require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider('http://159.69.37.73:8090');
const solidityNode = new HttpProvider('http://159.69.37.73:8091');
const eventServer = 'http://47.90.203.178:18891';

const app = async () => {
    const tronWeb = new TronWeb(
        fullNode, 
        solidityNode, 
        eventServer
    );

    const nodes = await tronWeb.isConnected();
    const connected = !Object.entries(nodes).map(([ name, connected ]) => {
        if(!connected)
            console.error(`Error: ${name} is not connected`);

        return connected;
    }).includes(false);

    if(!connected)
        return;

    console.log('Starting application');
};

app();