## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- POST /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/receive/accepted/:userId
- POST /request/receive/rejected/:userId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed (will show other users from the app)

status = interested, ignored, accepted, rejected, pending.
