module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "src/tsconfig.test.json",
        "sourceType": "module"
    },
    "plugins": [
        "eslint-plugin-import",
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/indent": [
            "error",
            "tab"
        ],
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/quotes": [
            "error",
            "single"
        ],
        "@typescript-eslint/semi": [
            "error",
            "always"
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "comma-dangle": "off",
        "curly": "error",
        "eol-last": "error",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-blacklist": "off",
        "id-match": "off",
        "import/no-default-export": "off",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "dir",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "no-debugger": "error",
        "no-empty": "off",
        "no-eval": "error",
        "no-fallthrough": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-redeclare": "error",
        "no-shadow": [
            "off",
            {
                "hoist": "all"
            }
        ],
        "no-trailing-spaces": "off",
        "no-underscore-dangle": "off",
        "no-unused-labels": "error",
        "no-var": "error",
        "radix": "error",
        "spaced-comment": [
            "error",
            "always",
            {
                "markers": [
                    "/"
                ]
            }
        ]
    }
};
