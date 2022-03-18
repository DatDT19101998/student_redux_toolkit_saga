Routing

authSaga

LOOP

- if loggedIn , watch Logout
- else watch Login

Login

- call login api to get token + user infor
- set token to localStoregare
- redirect to admin page

Logout

- clear token
- redirect to Login
