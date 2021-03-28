.PHONY: start-app destroy run-tests

start-app:
	@docker-compose up server

run-tests:
	@docker-compose up tests

destroy:
	@docker-compose down -v --rmi local
