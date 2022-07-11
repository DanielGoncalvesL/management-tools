start-databases:
	@docker-compose up -d postgres mongo

start-api:
	@docker-compose up --build api

start-app: start-databases start-api

