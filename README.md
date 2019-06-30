# <p align="center" style="color: green" size="40"> Unsilenced </p>

<p align="center">
  endpoints 
</p>

# About

about the project here

# Instructions

All API requests are made to: **_ https://unsilenced.herokuapp.com_**

This api is using **https://sendgrid.com/** for sending emails.



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
If require field are not preset it will return a object with message:

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

a **GET** request to \_/api/users will return all the users existing in database

URL: /api/users/

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

In case the token is not present in the header it will respond with:

```

{
"message": "Invalid Credentials"
}

```
