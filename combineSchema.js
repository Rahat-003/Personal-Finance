import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaDir = path.join(__dirname, "src", "models");
const outputFile = path.join(__dirname, "prisma", "schema.prisma");

// Define the new datasource and generator content
const newContent = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

// Initialize combined schema with new content
let combinedSchema = newContent.trim();

// Read all .prisma files from the models directory and append their content
fs.readdirSync(schemaDir).forEach((file) => {
    if (path.extname(file) === ".prisma") {
        const content = fs.readFileSync(path.join(schemaDir, file), "utf8");
        combinedSchema += "\n\n" + content.trim();
    }
});

// Write the combined schema to the output file, overriding any existing content
fs.writeFileSync(outputFile, combinedSchema.trim());

console.log("Combined schema file created successfully!");
