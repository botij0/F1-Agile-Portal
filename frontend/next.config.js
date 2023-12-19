/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pxfvrkflonlookyusxtb.supabase.in",
                port: "",
                pathname: "/storage/v1/object/public/Images/**",
            },
        ],
    },
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
};
