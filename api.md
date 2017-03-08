# Mock API Specs

* The mock API server is a mock server that allows you to fetch fake email threads, and send replies on those threads.
* All endpoints take JSON body input, and return JSON.
* A CURL example is provided for each request
* **URL** https://hndrxx.polymail.io/
* **Note:** Because the server holds the threads and corresponding replies in-memory, the server when restarted will lose all of its replies. The server is restarted at least once per-day.

## Errors

```json
{   

}
```

## Models

`Login` model:
```json
{
    "email": "email",
    "password": "password"
}
```

`Thread` model:
```json
{

}
```

## Authentication

To login, provide a `Login` payload

```bash
curl "https://hndrxx.polymail.io/v1/auth/login"
```

Once authenticated, each request must contain an `Authorization` header, with the value `METRO token`:

```bash
curl "https://hndrxx.polymail.io/" \
     -H "Authorization: METRO token"
```

### Usernames / Passwords

## Fetching Threads


## Replying to a Thread
