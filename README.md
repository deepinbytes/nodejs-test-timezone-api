# NodeJS Test App - Timezone DB API
API to fetch timezone for the given country(s) with user authentication. Built with knex, JWT, Nodejs and Express


## Usage
```
$ docker-compose build
$ docker-compose down
$ docker-compose up -d
```

## API Doc

##### POST /api/register - User account creation API
```

{
"email":"a@b.com"
"password":"test"
}
```
##### POST /api/login - Login API returns access token and refresh token
```
{
"email":"a@b.com"
"password":"test"
}
```
##### POST /api/refreshToken - Generates new token with the refresh token obtained from Login API
```
{
"email":"a@b.com"
"refreshToken":"...."
}
```

##### GET /country - Retrieves all countries + timezone data
```$xslt
x-access-token:"...."
```
##### GET /country/{name} - Retrieves the country by name and its timezone data
```$xslt
x-access-token:"...."
```
##### GET /api/addDummyaccounts - Creates dummy accounts with default passwords 


## TODO

- Add pagination
- Linting
- Tests
- Proper Logging
- ....

## Others
This project was developed under time constraints, and is not bug-free and requires much more fine tuning. 
Please use issues for suggestions and bug reports.

