# User Registration API Documentation

## Register User
Register a new user in the system.

**Endpoint:** `POST /users/register`

### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string"
}

