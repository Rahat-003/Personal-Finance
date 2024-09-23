import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrisma from "eslint-plugin-prisma";

export default [
    {
        // Configure ESLint for JavaScript files
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "module",
            globals: globals.node,
        },
        ignorePatterns: [
            "./src/models/**", // Ignore all files in src/models folder
            "./prisma/**", // Ignore all files in prisma folder
        ],
    },
    {
        // Configure global options for all files
        languageOptions: {
            globals: {
                ...globals.browser, // Support browser globals if needed
                ...globals.node, // Add Node.js globals
            },
        },
    },
    pluginJs.configs.recommended, // Add recommended JS rules
    {
        rules: {
            "no-unused-vars": "off", // Disable errors for unused variables
        },
    },
    pluginPrisma.configs.recommended, // Add the Prisma plugin with recommended rules
];
