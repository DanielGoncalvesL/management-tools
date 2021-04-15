/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
 module.exports = {
    "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
    "packageManager": "yarn",
    "mutate": [
        "src/**/*.ts",
        "!src/shared/infra/http/server.ts",
        "!src/shared/infra/typeorm/migrations/**"
    ],
    "reporters": [
        "html",
        "clear-text",
        "progress",
        "dashboard"
    ],
    "testRunner": "jest",
    "coverageAnalysis": "perTest",
    "commandRunner": { "command": "yarn test" },
    "checkers": ["typescript"],
    "tsconfigFile": "tsconfig.json",
    "dashboard": {
        "project": "github.com/DanielGoncalvesL/management-tools",
        "version": process.env.BRANCH
    },
    "mutator": {
        "excludedMutations": [
            "ArrayDeclaration",
            "BlockStatement",
            "ObjectLiteral"
        ]
    }
}