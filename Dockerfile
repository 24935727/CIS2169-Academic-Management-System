FROM clue/json-server
EXPOSE 80
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/module.json /data/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/routes.json /data/routes/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/index.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/main.js /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/style.css data/public/
ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes", "/data/routes/routes.json","--port", "80"]
# ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes","--port", "80"] #Use this option if you do not want to use custom routing