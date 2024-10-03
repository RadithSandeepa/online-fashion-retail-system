/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com']
    },
    env: {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "xxxxxxxxx",
    },
}

module.exports = nextConfig