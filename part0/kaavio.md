0.4: uusi muistiinpano

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

0.5: single page app

sequenceDiagram
    participant browser
    participant server
    
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server    

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: download js file
    deactivate server   


0.6: uusi muistiinpano

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa.json
    activate server
    server->>browser: GET https://studies.cs.helsinki.fi/exampleapp/spa
    deactivate server

    note: browser posts a JSON string to the server that includes all the needed data using the Content-type header
