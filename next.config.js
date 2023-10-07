/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.apollographql.com',
                port: '',
                pathname: '/**',
            }
        ],
    },
}

module.exports = nextConfig
