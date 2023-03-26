module.exports = {
    env: {
        NEXT_PUBLIC_BASE_URL: 'https://bubbajoe.dev',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '/bubbajoe**',
            },
        ],
    },
}