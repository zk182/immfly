# Immfly

# Install

in root folder, create an .env with [.env.example](.env.example) structure, you could copy 
```
PRETTY_LOGS=1
APP_NAME=immfly
PORT=3028
TZ=Europe/Madrid
MAIN_DOMAIN=localhost
NODE_ENV=prod
SIMPLE_ARRAY="[1,2,3,4]"
```

then run

```
npm i
```

# Test

```
npm run test
```

# Start

```
npm run dev
```

# Docker


```
docker build -t immfly .   
```

then

```
docker run -p 3028:3028 immfly  
```

# Postman

There's a postman collection in [postman/immfly.json](postman/immfly.json) for testing purposes
