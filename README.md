# <p align="center" style="color: green" size="40"> Unsilenced </p>

<p align="center">
  endpoints 
</p>

# About

about the project here

# Instructions

All API requests are made to: **https://unsilenced.herokuapp.com**



## REGISTER (POST) User

a **POST** request to _/register_ will create a new user and return an object

`email must be in the form: anystring@anystring.anystring and all the require field must be present`

if not server will respond with :

```
{
    "message": "Please provide valid credentinals"
}
```

Form will need `username` , `email` , `password` and `channel_link` that are require for register a user
URL: /register

Example data:

```
{
	"username":"Mark",
	"email":"mark@test.com",
	"password":"12345",
	"channel_link":"link for channel here"
}

```

If posted succesfully, will return a object with message:

```
{
    "message": "User: Mark was registered succesfully",
    "id": 14,
    "email": "marks@test.com",
    "username": "Mark",
    "channelLink": "link for channel here",
}
```

If require field are not preset it will return a object with message:

```

{
    "message": "Please provide valid credentinals"
}

Register request could take more optional fields like `channel_name` and `social_links`

```

## LOGIN (POST) User

a **POST** request to /login will return an object

URL: /login

Form will need `username` or `email`  and `password`. If posted correctly, should get a response of:

Example data of a login post request:

```
{
	"username":"Pavol",
	"password":"test123"
}

OR

{
	"email":"pavol@test.com",
	"password":"test123"
}

```
If require field are preset it will return a object with message:

```
{
    "message": "Welcome, Pavol!",
    "username": "Pavol",
    "email": "pavol@test.com",
    "channelLink": "https://www.youtube.com/channel/UCaziuyHLR37c2jBkHrYSQMA",
    "channelName": "best music",
    "socialLinks": "facebook tweeter",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJ1c2VybmFtZSI6IlBhdm9sIiwiZW1pYWwiOiJwYXZvbEB0ZXN0LmNvbSIsImlhdCI6MTU2MTkyNzE2NiwiZXhwIjoxNTYxOTk5MTY2fQ.XGxi8_yUGNM6tNqNS6k_YJMXMOw_c39rfXG5JkuF-UA"
}
```

If require field are not preset it will return a object with message:

```
{
    "message": "Invalid Credentials"
}
```

---

## GET ALL Users

a **GET** request to /users will return all the users existing in database

URL: /users

This route is restricted - a authorization header with the token its required

If Successful, response should be 200 (OK). If unsuccessful, response should be 500. Example users data:

```
{
   "users": [
        {
            "id": 1,
            "username": "Alex",
            "email": "mark@test.com",
            "password": "$2a$12$KrxBsd.xQBDgNnF3HwywbuHz9FO2STMHFeoIry.ThzCm8quQCcfo.",
            "channel_link": "https://www.youtube.com/channel/UCaziuyHLR37c2jBkHrYSQMA",
            "channel_name": "best music",
            "social_links": "facebook tweeter",
            "created_at": "2019-06-30 18:06:13",
            "updated_at": "2019-06-30 18:06:13"
        },
        {
            "id": 2,
            "username": "Pavol",
            "email": "pavol@test.com",
            "password": "$2a$12$qqQnOwe4.dJzdJ8X/3IMAuIHBxm8XPiuzknrPArfm1KvwfjNQgmL2",
            "channel_link": "https://www.youtube.com/channel/UCaziuyHLR37c2jBkHrYSQMA",
            "channel_name": "best music",
            "social_links": "facebook tweeter",
            "created_at": "2019-06-30 18:06:13",
            "updated_at": "2019-06-30 18:06:13"
        },
        {
            "id": 3,
            "username": "Delva",
            "email": "delba@test.com",
            "password": "$2a$12$GaQcQVWz4JQ6N45mnarMi.yUol8Dz7ts/TqqiJ7DvrBFZbMPZZA2i",
            "channel_link": "https://www.youtube.com/channel/UCsMiwFQdEP5t_5a7CpGN7tQ",
            "channel_name": "sports for everyone",
            "social_links": "facebook tweeter",
            "created_at": "2019-06-30 18:06:13",
            "updated_at": "2019-06-30 18:06:13"
        },
    ]
}
```

In case the token is not present in the header it will respond with 401 status and the message:

```
{
    "message": "You are not allowed !!"
}

```

## GET Users By ID

a **GET** request to /users/:id will return the user with specified ID

URL: /users/:id

This route is restricted - a authorization header with the token its required

If Successful, response should be 200 (OK), should get a response of:

```
{
    "id": 4,
    "username": "Mat",
    "email": "Mat@test.com",
    "password": "$2a$12$x07OykJkm/vJnwhcIOt40uwpAkVH4zYLS8Luy0JqFUqC1r9ezVhxu",
    "channel_link": "https://www.youtube.com/channel/UCKBmwzjp-6eFAW0HYNMWJ5w",
    "channel_name": "all about dance",
    "social_links": "facebook tweeter",
    "created_at": "2019-06-30 18:06:13",
    "updated_at": "2019-06-30 18:06:13"
}
```

If id does't exist in database will response with 404 and a message:

```

{
    "message": "The specified ID not found"
}

```

If unsuccessful, response should be 500 and the message `error: "Error trying to get a user by Id"`

In case the token is not present in the header it will respond with:

```
{
    "message": "You are not allowed !!"
}
```

## EDIT (PUT) User

URL: /users/:id

This route is restricted - a authorization header with the token its required

Example: Changing user 's `username` from Mat to Alin, and `email` from mat@test.com to alin@test.com

```
{
    "username": "Alin",
    "email": "alin@test.com"
}
```

A successful post will return the updated user ID and a message. For example, the above edit will return:

```
{
    "updateID": "4",
    "message": "User: Alin Update succesfully"
}
```

If user with specified ID does't exist in database will response with 404 and a message:

```
{
     "message": "User was not found"

}
```

If unsuccessful, response should be 500 and a message:

```
{
    "error": "Error trying to update a user"
}
```

## DELETE User

URL: /users/:id

This route is restricted - a authorization header with the token its required

A successful delete will return a object with a message, for example deleting a user succesfully will return:

```
{
    "message": "User was delete Succesfully"
}
```

If user with specified ID does't exist in database will response with 404 and a message:

```
{
    "message": "User was not found"
}
```
---

## (POST) Forgot Password

URL: /send-email

No token required


Form will need `email` of the user. If email exists in database , should get a response of:

Example data:
```
{
	"email":"pavol@test.com"
}
RESPONSE IF SUCCESFULL
{
    "message": "Password was changed and email was succesfullt sent to the user"
}
```

User will recive a message with :
subject ` subject: "Hello From Unsilenced, This is your new password",` 
text: `2ww2233` is your new password we recomand you to change it from the settings`

In case the email its not in the database server will respond with:

```
{
    "message": "This email doesn't exist, please register"
}
```

