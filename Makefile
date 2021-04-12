.PHONY: start-app destroy run-tests destroy/start-app run-tests-mutation

start-app:
	@docker-compose up server

run-tests:
	@docker-compose up tests

run-tests-mutation:
	@docker-compose up tests-mutation

destroy:
	@docker-compose down -v --rmi local

destroy/start-app: destroy start-app
