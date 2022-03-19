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

## Student

- Routing

List student: Search by Name,Filter by city,Sort by name, mark, Pagination
Add, Edit student: React hook form v7, Yup validation

Slice

- Loading
- list
- filter: {page:1, \_limit:10...}
- pagination

AddEdit page

- mode: add vs edit
- initialValue
- values:
  - name: TextInput
  - age: NumberInput
  - gender: RadioInput
  - city: Select
  - mark: NumberInput
- validation
  - name: at least 2 words
  - age >= 18
  - gender: male/female
  - city: required
  - mark: 0 => 10
- Submitsion redirect to list page after submitting successfully

## Tổ chức Form hiệu quả

- 1 Form gồnm nhiều field
- FormField là cầu nối giữa UI và form, giúp bind form value vào Ui control
- Ui control là các thẻ input, select ... hay các cútom component của Ui lib

## Kiến trúc

Page container => Form component => Formfield => Ui control
