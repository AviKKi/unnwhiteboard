dev:
	docker-compose -f local.yml up
crawl:
	docker-compose -f local.yml run --rm node bash -c "npm run crawl $(slug)"