# Mock API Specs

* The mock API server is a mock server that allows you to fetch fake email threads, and send replies on those threads.
* All endpoints take JSON body input, and return JSON.
* A CURL example is provided for each request
* **URL** https://hndrxx.polymail.io/
* **Note:** Because the server holds the threads and corresponding replies in-memory, the server when restarted will lose all of its replies and authentication tokens, requiring re-login. The server is restarted at least once per-day.

## Authentication

Login Endpoint:
- *Method:* POST
- *URL:* `https://hndrxx.polymail.io/v1/auth/login`
- *Example Body:*
```json
{
    "email": "react@polymail.io",
    "password": "fourspaces"
}
```

Example CURL Request:
```bash
curl -X "POST" "https://hndrxx.polymail.io/v1/auth/login" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "email": "react@polymail.io",
  "password": "fourspaces"
}'
```

An example successful response:
```json
{
  "token": "1plNu9Ro9D7pTyGkG2F1"
}
```

An example error response:
```json
{
    "code": 400,
    "description": "Invalid email or password,"
}
```

Once authenticated, each request must contain an `Authorization` header, with the value `METRO token`. Using the result from above's request:
```bash
curl "https://hndrxx.polymail.io/" \
     -H "Authorization: METRO 1plNu9Ro9D7pTyGkG2F1"
```

### Usernames / Passwords

The following username / password combinations should work:

| *Email*           | *Password* |
|-------------------|------------|
| react@polymail.io | fourspaces |
| redux@polymail.io | tabsrule   |

## Fetching Threads

- *Method:* GET
- *URL:* `https://hndrxx.polymail.io/v1/threads`

CURL Request Example:

```bash
curl "https://hndrxx.polymail.io/v1/threads" \
     -H "Authorization: METRO 1plNu9Ro9D7pTyGkG2F1"
```

Sample response. Not all fields may be returned for each thread/message.
```json
[
  {
    "id": "2000",
    "user": "1234",
    "messages": [
      {
        "id": "yenDoYAQwY",
        "sent": "2016-12-08T18:38:25.24213289-08:00",
        "from": "Jordan Dua <schemingd0g@outlook.com>",
        "to": [
          "Jenny Blake <nicefeline12312@yahoo.com>"
        ],
        "cc": [
          "Alvin Ranger <angryd0g@msn.com>"
        ],
        "bcc": [
          "Momo Ranger <bashfuldeer@yahoo.com>"
        ],
        "subject": "test subject",
        "body": "<p>test content</p>",
        "read": false
      }
    ]
  },
  {
    "id": "3000",
    "user": "1234",
    "messages": [
      {
        "id": "cwL2Q1Vdns",
        "sent": "2016-08-31T18:38:25.242572272-07:00",
        "from": "Clark Yang <bashfuld0g@polymail.io>",
        "to": [
          "Momo Jackson <gracefulSANTA@gmail.com>"
        ],
        "cc": [
          "Helen Smith <happydeer@polymail.io>"
        ],
        "bcc": [
          "Sandy Rose <helpingfeline12312@yahoo.com>"
        ],
        "subject": "test subject",
        "body": "<strong>hello</strong>",
        "read": true
      },
      {
        "id": "UlJ6xailQs",
        "sent": "2017-01-27T18:38:25.242994211-08:00",
        "from": "Mary Smith <naughtydeer@outlook.com>",
        "to": [
          "Derek Quilt <naughtyd0g@gmail.com>"
        ],
        "cc": [
          "Derek Smith <angryfeline12312@comcast.net>"
        ],
        "bcc": [
          "Wilson Who <angrydeer@yahoo.com>"
        ],
        "subject": "hi derek!",
        "body": "<p>Hello!</p>",
        "read": true
      },
      {
        "id": "8f5VF4ILDE",
        "sent": "2016-06-20T18:38:25.243462809-07:00",
        "from": "Becky Ranger <sadd0g@outlook.com>",
        "to": [
          "Jordan Who <angrytheOnly1@comcast.net>"
        ],
        "cc": [
          "Albert Holmes <agedSANTA@outlook.com>"
        ],
        "bcc": [
          "Calvin Barket <bashfulSANTA@msn.com>"
        ],
        "subject": "re: hi derek!",
        "body": "<p>Testing!</p>",
        "read": false
      }
    ]
  }
]
```

## Replying to a Thread

- *Method:* `POST`
- *URL:* `https://hndrxx.polymail.io/v1/threads/:id/reply` Make sure to replace `:id` with corresponding thread's id.
- *Example Body:*
```json
{
    "body": "<p>reply!</p>"
}
```

CURL Request Example:
```bash
curl -X "POST" "https://hndrxx.polymail.io/v1/threads/3000/reply" \
     -H "Authorization: METRO 1plNu9Ro9D7pTyGkG2F1" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d $'{
  "body": "<p>reply!</p>"
}'
```

A successful response returns the full thread model including the reply:
```json
{
    "id": "2000",
    "user": "1234",
    "messages": [
        {
            "id": "yenDoYAQwY",
            "sent": "2016-12-08T18:38:25.24213289-08:00",
            "from": "Jordan Dua <schemingd0g@outlook.com>",
            "to": [
                "Jenny Blake <nicefeline12312@yahoo.com>"
            ],
            "cc": [
                "Alvin Ranger <angryd0g@msn.com>"
            ],
            "bcc": [
                "Momo Ranger <bashfuldeer@yahoo.com>"
            ],
            "subject": "test subject",
            "body": "<p>test content</p>",
            "read": false
        },
        {
            "id": "gN2FKrPeCg",
            "sent": "2016-12-10T18:00:00-08:00",
            "read": false,
            "body": "<p>reply!</p>"
        }
    ]
}
```

Sample error response:
```json
{
    "code": 400,
    "description": "A body is required."
}
```
