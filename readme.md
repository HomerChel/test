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

### Search exact trademark: 
* **URL**: `/trademark`  
* **Method**: `GET`  
* **URL parameters**:  
    **Required**:  
    `search=[string]`  
    **Optional**:  
    `case_sensitive=[true|false]` (false by default)

### Fuzzy search:  
* **URL**: `/trademark/fuzzy`  
* **Method**: `GET`  
* **URL parameters**:  
    **Required**:  
    `search=[string]`  

### Test API address:  
`http://34.116.238.133:3000`


