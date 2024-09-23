import { exec } from "child_process";

// Run the combineSchema.js script first
exec("node combineSchema.js", (error, stdout, stderr) => {
    // Log any errors from combineSchema.js
    if (error) {
        console.error(
            `Error running combineSchema.js: ${stderr || error.message}`
        );
        console.error(`Output: ${stdout}`);
        process.exit(1);
    }

    // If combineSchema.js indicates no changes, exit silently
    if (stdout.includes("No changes detected")) {
        process.exit(0); // Silent exit
    }

    // If changes were detected, run prisma generate
    if (stdout.includes("Combined schema file created successfully!")) {
        exec(
            "npx prisma generate",
            (generateError, generateStdout, generateStderr) => {
                if (generateError) {
                    console.error(
                        `Error generating Prisma Client: ${generateStderr || generateError.message}`
                    );
                    process.exit(1);
                }

                // Filter the output to match the required format
                const filteredOutput = generateStdout
                    .split("\n")
                    .filter((line) => line.includes("✔ Generated"))
                    .map((line) => line.trim()) // Trim any extra spaces
                    .join("\n");

                // Output the filtered result
                if (filteredOutput) {
                    console.log(filteredOutput);
                } else {
                    console.log("No generated output found.");
                }

                // process.exit(0); // Successful generation
            }
        );
    }
});
