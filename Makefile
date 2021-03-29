.PHONY: start-app destroy run-tests destroy/start-app

start-app:
	@docker-compose up server

run-tests:
	@docker-compose up tests

destroy:
	@docker-compose down -v --rmi local

destroy/start-app: destroy start-app
