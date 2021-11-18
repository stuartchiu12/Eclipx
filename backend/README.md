# backend

## Project setup
```
npm install
```
copy .env-sample to .env
insert your own firebase APIKEY and SERVICE_ACCOUNT json

##users setup in Firebase auth
|username   | password  | isAdmin |  
|---|---| --- |
|  admin@eclipx.com | eclipx  | true|
| readonly@eclipx.com  | eclipx  | false  |   |   |

the role is store in firebase collection "user"

###run the project
```
npm run dev
```