import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
};
export default MillionLint.next({
    rsc: true,
})(nextConfig);
