# DEPLOY / build commands
build-and-tag-image:
	docker build -t fresh-todo-app-test .

deploy-stack:
	docker-compose -f ./docker-compose.yml --env-file .env down
	docker-compose -f ./docker-compose.yml --env-file .env rm
	docker-compose -f ./docker-compose.yml --env-file .env build
	docker-compose -f ./docker-compose.yml --env-file .env up -d --remove-orphans

build-and-deploy-stack: build-and-tag-image deploy-stack

stack-down:
	docker-compose -f ./docker-compose.yml --env-file .env down
	docker-compose -f ./docker-compose.yml --env-file .env rm

# DEV commands
run-dev:
	docker-compose -f ./docker-compose-dev.yml down
	docker-compose -f ./docker-compose-dev.yml rm
	docker-compose -f ./docker-compose-dev.yml build
	docker-compose -f ./docker-compose-dev.yml up -d --remove-orphans
	# Sleep below is needed to wait for mongo to start, otherwise we would need 
	# to handle that in code.
	sleep 5
	deno task start

dev-down:
	docker-compose -f ./docker-compose-dev.yml down
	docker-compose -f ./docker-compose-dev.yml rm