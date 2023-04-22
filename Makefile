.PHONY: user-micro-service-run-flow

# Set the default target to 'start' when calling `make` with no arguments.
.DEFAULT_GOAL := start

# Define the Docker Compose file path
COMPOSE_FILE = ./deploy/local/docker-compose.yml

user-micro-service-run-flow:\
	docker-compose\
	clean\
	install\
	start

# Run docker-compose
docker-compose:
	docker-compose -f $(COMPOSE_FILE) up -d

# Install dependencies
install:
	npm ci

# Start the application
start:
	npm run start:dev

# Run tests
test:
	npm test

# Clean up the project
clean:
	rm -rf node_modules
