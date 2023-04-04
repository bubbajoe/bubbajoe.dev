module.exports = {
    env: {
        NEXT_PUBLIC_BASE_URL: 'https://bubbajoe.dev',
        NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID: 'G-0FR317TLNJ',
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