## Note: this app is for development mode. No optimization yet for production environment

sl:
	docker compose up

up start:
	docker compose up -d

down stop:
	docker compose stop

rebuild:
	docker-compose down --remove-orphans  && docker-compose rm && docker-compose up --build -d --force-recreate && docker-compose logs -f

clear:
	docker compose down --volumes
