if [ "$1" = "production" ]; then
    echo "Starting in production mode"
    docker-compose up -d
else
    echo "Starting application in dev mode"
    docker-compose -f docker-compose.dev.yml up -d --build
    npx lerna run start--scope=@express-react-ts-starter/frontend
fi
