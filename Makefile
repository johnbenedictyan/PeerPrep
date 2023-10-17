restart_matching_staging:
	docker-compose -f docker-compose.staging.yml down matching && \
	docker-compose -f docker-compose.staging.yml up matching --build -d

restart_question_staging:
	docker-compose -f docker-compose.staging.yml down question && \
	docker-compose -f docker-compose.staging.yml up question --build -d

restart_socket_staging:
	docker-compose -f docker-compose.staging.yml down socket && \
	docker-compose -f docker-compose.staging.yml up socket --build -d

restart_user_staging:
	docker-compose -f docker-compose.staging.yml down user && \
	docker-compose -f docker-compose.staging.yml up user --build -d

restart_client_staging:
	docker-compose -f docker-compose.staging.yml down client && \
	docker-compose -f docker-compose.staging.yml up client --build -d
