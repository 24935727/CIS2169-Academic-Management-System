FROM clue/json-server
EXPOSE 80
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/data.json /data/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/routes.json /data/routes/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/index.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/academic.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/module.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/roomBooking.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/degree.html /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/js/room.js /data/public/

ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/js/module.js /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/js/degree.js /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/js/academic.js /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/js/roomBooking.js /data/public/
ADD https://raw.githubusercontent.com/24935727/CIS2169-Academic-Management-System/main/style.css data/public/
ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes", "/data/routes/routes.json","--port", "80"]
# ENTRYPOINT ["json-server", "-w", "/data/data.json", "--routes","--port", "80"] 