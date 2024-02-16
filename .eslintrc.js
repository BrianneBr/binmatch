module.exports = {
    "root": true,
    "env": {
		"node":         true,
		"commonjs":     true,
		"es6":          true,
		"jest/globals": true
	},
	"parser":  "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint",
		"jest"
	],
    "extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended"
	],
    "rules": {
		"@typescript-eslint/semi": ["warn"],
    }
};
