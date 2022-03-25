/// <reference types="react-scripts" />

interface Window {
  ethereum: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange: boolean
    request: any
    chainId: string
    networkVersion: string | number
  }
  web3?: any
}


declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}

declare module "waterwheelCarousel";
declare function waterwheelCarousel(data: any);



