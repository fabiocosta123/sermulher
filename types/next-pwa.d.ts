declare module 'next-pwa' {
    import { NextConfig } from 'next';
    
    function withPWA(config: NextConfig): NextConfig;
    
    export default function (pwaConfig: any): typeof withPWA;
}