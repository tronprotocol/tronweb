'use client';
import { useEffect } from "react";
import { connect } from "./utils/tronlink";


export default function Home() {
  useEffect(() => {
    (async () => {
      const tronWeb = await connect();
      
      const sendTrxDemo = async () => {
        const receipt = await tronWeb.trx.sendTrx('TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC', 1000000);
        console.log('sendTrx receipt', receipt);
      };

      const sendUsdtDemo = async () => {
        const tx = await tronWeb.transactionBuilder.triggerSmartContract(
          'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
          'transfer(address,uint256)',
          {
            txLocal: true,
          },
          [
            {
              type: 'address',
              value: 'TMVQGm1qAQYVdetCeGRRkTWYYrLXuHK2HC',
            },
            {
              type: 'uint256',
              value: 100
            }
          ]
        );
        const receipt = await tronWeb.trx.broadcast(await tronWeb.trx.sign(tx.transaction));
        console.log(receipt);
      };

      // await sendTrxDemo();
      await sendUsdtDemo();
    })();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className="relative flex place-items-center z-[-1] text-3xl">
        Open console to see the demo result.
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
        <a
          href="https://tronweb.network/"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            HomePage{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Know more about TronWeb.
          </p>
        </a>

        <a
          href="https://tronweb.network/docu/docs/intro"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Learn how to use TronWeb!
          </p>
        </a>
      </div>
    </main>
  );
}
