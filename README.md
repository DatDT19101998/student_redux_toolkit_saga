Routing

## authSaga

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

lib: cennected-react-router

## handle error & loading

- loading: use base on redux store
- error: eliminate the usage much as you can

==> Considerrations

- Trigger errror toast from saga
