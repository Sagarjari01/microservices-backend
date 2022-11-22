# Stateless Microservice for Hackerbay

A simple stateless microservice in Nodejs, with three major functionalities -

 * Authentication
 * JSON patching
 * Image Thumbnail Generation
 * Adding User address in database


## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/Sagarjari01/microservices-backend.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd server
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with ```npm start```.

**5.**  **Important** Create a ```.env``` file and set ```JWT_SECRET``` to any secret phrase you want, set ```API_URI = /api/v1``` and for mongoDb database use your connection url and set ```MONGO_URI``` key to your url.
 

## Testing the API routes.

Since this is mostly an API with post and patch requests, testing will be done with [Postman](https://www.getpostman.com/)

### Authentication
This is a mock authentication so you can pass in any username or password to login.
 1. Set the request to **POST** and the url to _/api/v1/login_. 
 2. You will be setting 2 keys (for username and password). Set the ```name``` key to any name. Set ```password``` to any password.
 3. Hit ```Send```. You will get a result in this format:
 ```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoieHl6IiwiaWF0IjoxNjY5MTIzNzc0fQ.z-K-hq8B3D4vzSBGSPuwy2lBVWfRUaGaztKZW80hgiQ"
}
 ```


 ### JSON patching
Apply json patch to a json object, and return the resulting json object.
 1. Set the request to **PATCH** and the url to _/api/v1/patch_.
 2. Set the key ```document``` to an object you would like to patch. Set the key ```operation``` to the object you want to use to patch the ```document```.
 ```
 Examples:
 document
 { "firstName": "Sagar", "contactDetails": { "phoneNumbers": [] }},

 operation
 { "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": {"number":9889889889} }
 ```
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. Expected result should be:
 ```
 {
    "document": {
        "firstName": "Sagar",
        "contactDetails": {
            "phoneNumbers": [
                {
                    "number": 9889889889
                }
            ]
        }
    }
 }
 ```


 ### Image Thumbnail Generation
This request contains a public image URL. It downloads the image, resizes to 50x50 pixels, and returns the resulting thumbnail.
 1. Set the request to **POST** and the url to _/api/v1/thumbnail_.
 2. Set the key ```imageUrl``` to a public image url.
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. Image will be downloaded and converted to a thumbnail of size 50x50 pixels with a sample result as below:
 ```
 {
    "converted": true,
    "thumbnail": "E:\\Programs\\Backend development\\Microservices\\server\\imgs\\resized\\resizeoutput.png"
 }
```

 ### Adding User address in database
This will create a request to add a user address and save it into the database.
 1. Set the request to **POST** and the url to _/api/v1/add-address_.
 2. Set the key ```address``` to your address.
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. This will return object of user like given below. Since logged-in user is authenticated so the username will be apper from that authentication and address will be updated.

```
 {
    "user": {
        "_id": "637cc4c326c32a8cd4d581ad",
        "name": "elumi",
        "address": [
            "New address",
            "New address 2"
        ],
        "__v": 0
    }
 }
```