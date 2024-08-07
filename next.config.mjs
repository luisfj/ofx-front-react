/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isProduction ? '/csu' : '',
    assetPrefix: isProduction ? '/assets-csu/' : '',
    output: "standalone"
};


export default nextConfig;
