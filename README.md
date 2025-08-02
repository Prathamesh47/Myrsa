# Myrsa
Backend

------------------------------------------------------------------------------------------------------------




mkdir task
cd task
npm init -y

npm install express mysql2 cors
npm install --save-dev typescript ts-node @types/node @types/express

npm install --save-dev @types/cors


npx tsc --init

Then update your tsconfig.json like this:

{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  }
}


mkdir -p src/{config,controllers,models,routes,services}
touch src/{app.ts,server.ts}


Add npm scripts to package.json:
"scripts": {
  "dev": "ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

npx ts-node src/server.ts
----------------------------------------------
src/
	config/
		database.ts          // DB connection setup
	controllers/
		employee.controller.ts  // Business logic (handles request/response)
	models/
		employee.model.ts    // Employee data type definition 
	routes/
		employee.routes.ts   // Defines API endpoints (GET, POST, etc.)
	services/
		employee.service.ts  // Database queries logic
	app.ts                   // Middleware and routing setup
	server.ts                // Entry point to start the server : start the server at localhost:8080
----------------------------------------------

-----------------------------------------------------------------------------------------------------

Frontend

npm install -g @angular/cli
ng version

ng new employee_app
cd employee_app
npm install bootstrap@4 --save

//
In angular.json, under "styles":
---
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"src/styles.css"
---
//

npm install @angular/forms

ng serve
