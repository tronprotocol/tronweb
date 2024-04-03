import { TronWeb } from "tronweb";
import { notification } from "antd";

export const connect = (): Promise<TronWeb> => {
    return new Promise((resolve, reject) => {
        const Window = window as any;
        let count = 0;
        let timeId = setInterval(() => {
            count++;
            if (count > 10) {
                clearInterval(timeId);
                notification.warning({
                    message: 'Please install TronLink Extention.'
                });
                reject();
            }
            if (!Window.tronWeb || !Window.tronWeb.ready) return;
            clearInterval(timeId);
            resolve(Window.tronWeb);
        }, 200);
    });
}