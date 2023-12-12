call npx tailwindcss -i ./src/static/input.css -o ./src/static/output.css --watch
call npm run langium:generate 
call npm run build
call npm run build:web

call code --extensionDevelopmentPath=$PWD 
