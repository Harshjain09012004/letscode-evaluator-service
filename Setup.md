## How to setup typescript on new express project

1. 
```
npm init
```

2. 
```
npm install -D typescript
```

3. 
```
tsc --init
```

4. 
```
Uncomment the required configuration in tsconfig.json and add more configs as needed
```

5. 
```
Add the following Scripts in package.json

{
    "build": "npx tsc",
    "watch": "tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist/index.js",
    "dev": "npx concurrently --kill-others \"npm run watch\" \"npm run start\""
}
```

6. 
```
npm run dev
```