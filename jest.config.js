import { defaults } from "jest-config"

/** @returns {Promise<import('jest').Config>} */
export default async () => {
    return {
        ...defaults,
        verbose: true,
        rootDir: "./src",
        transform: {},
    };
};