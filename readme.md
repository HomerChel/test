## Requirements:

mongoDB ^5.0.0  
node ^16.0.0

## Installation:
1. install modules with  
    ```
    npm i
    ```
2. create **.env** using **.env_example**
3. create and populate it with **zip files** using script **db/setup.js** like this:  
    ```
    node setup.js <path to zip file 1> [<path to zip file 2> <path to zip file 3> ...]
    ```
4. start project with  
    ```
    npm start
    ```

## Usage:

Endpoint for exact trademark: 
``` 
/trademark?search=search query
```

Endpoint for fuzzy search:  
```
/trademark/fuzzy?search=search query
```
