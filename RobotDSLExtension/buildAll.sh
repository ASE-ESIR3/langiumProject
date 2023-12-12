npx tailwindcss -i ./src/static/input.css -o ./public/output.css --watch
npm run langium:generate 
npm run build
npm run build:web

code --extensionDevelopmentPath=$PWD 
