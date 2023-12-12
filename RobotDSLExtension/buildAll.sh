npx tailwindcss -i ./src/static/input.css -o ./src/static/output.css
npm run langium:generate 
npm run build
npm run build:web

code --extensionDevelopmentPath=$PWD 
