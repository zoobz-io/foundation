.PHONY: help install install-hooks dev lint lint-fix typecheck test test-watch coverage check ci clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	pnpm install

install-hooks: ## Install git pre-commit hook
	git config core.hooksPath .githooks

dev: ## Start example app dev server
	pnpm --filter example dev

lint: ## Run ESLint
	pnpm lint

lint-fix: ## Run ESLint with auto-fix
	pnpm lint:fix

typecheck: ## Run type checking across all packages
	pnpm -r typecheck

test: ## Run all tests
	pnpm test

test-watch: ## Run tests in watch mode
	pnpm test:watch

coverage: ## Run tests with coverage report
	pnpm test:coverage

check: lint typecheck test ## Run lint, typecheck, and tests

ci: clean install check coverage ## Full CI simulation

clean: ## Remove generated files
	rm -rf node_modules/.cache
	rm -rf .coverage
	find . -name '.nuxt' -type d -not -path '*/node_modules/*' -exec rm -rf {} + 2>/dev/null || true
	find . -name '.output' -type d -not -path '*/node_modules/*' -exec rm -rf {} + 2>/dev/null || true
