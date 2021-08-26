# microservice_auth

Microservice autentifikasiyasi orqali tashqi resurslarni tekshiruvsiz kirishdan saqlash mumkin.
Ishlatilgan texnologiyalar:Nodejs, ExpressJs, MongoDb and npm packeges
<ul>
    <li>
        <a href="#user-sign-up">USER SIGN UP</a>
    </li>
    <li>
        <a href="#USER-SEND-VERIFICATION-SMS">USER SEND VERIFICATION SMS</a>
    </li>
    <li>
        <a href="#VERIFY-USER-WITH-VERIFICATION-SMS-CODE">VERIFY USER WITH VERIFICATION SMS CODE</a>
    </li>
    <li>
        <a href="#SIGN-IN-USER-WITH-PHONE-AND-PASSWORD">SIGN IN USER WITH PHONE AND PASSWORD</a>
    </li>
    <li>
        <a href="#CHECK-USER-BY-ACCESS-TOKEN">CHECK USER BY ACCESS TOKEN</a>
    </li> 
    <li>
        <a href="#IF-FORGOT-PASSWORD">IF FORGOT PASSWORD</a>
    </li>
    <li>
        <a href="#CONFIRM-SET-NEW-PASSWORD ">CONFIRM SET NEW PASSWORD </a>
    </li>
<ul>

-------------------------------------------------------------------
USER SIGN UP
-------------------------------------------------------------------      
        POST /api/auth/sign-up 
        body: {
            "phone":"phone number", //   required when don't enter email
            "email":"example@com"  // required when don't enter phone
            "firstname":"John", //required
            "lastname":"Doe",
            "password":"password" // required
            "username":"some username" 
        }
--------------------------------------------------------------------
        Response: {
            "isVerified": false,
            "_id": "60e9f3548c1a8131803cea3c",
            "phone": "phone number",
            "firstname": "some one",
            "lastname": "Doe",
            "createdAt": "2021-07-10T19:21:56.499Z",
            "updatedAt": "2021-07-10T19:21:56.499Z"
        }
-------------------------------------------------------------------

USER SEND VERIFICATION SMS 
-------------------------------------------------------------------
        POST /api/auth/request-send-sms
            request body:{
                "login":"phone number",
                "type":"phone"
            }
        POST /api/auth/request-send-sms
            request body:{
                "login":"example@gmail.com",
                "type":"email"
            }
------------------------------------------------------------------
            Response:{
                "expiry": 1625951191793 // expiry time
            }
------------------------------------------------------------------
VERIFY USER WITH VERIFICATION SMS CODE
------------------------------------------------------------------
    POST /api/auth/confirm
        request body:{
            "login":"phone number",
            "code":"confimation code",
            "type":"phone"
        }
    or
    POST /api/auth/confirm
        request body:{
            "email":"example@example.com",
            "code":"confim code",
            "type":"email"
        }
-----------------------------------------------------------------
        Response:{
            "success": "Succeessfully verified"
        }
------------------------------------------------------------------
SIGN IN USER WITH PHONE AND PASSWORD
------------------------------------------------------------------
    POST /api/auth/login
    Request:{
        "phone":"phone number",
        "password":"password"
    },
    or
    POST /api/auth/login
    Request:{
        "phone":"email@example.com",
        "password":"password"
    }
-------------------------------------------------------------------
    Response:{

        "access_token": "eMTUiLCJleHBpcmVzIjoxNjI1OTk0NDA5OTc3LCJpYXQiOjE2MjU5NTEyMDksImV4cCI6MTYyNTk1MqT4AkWGgh5I9D70U_4BzsI",
        "refresh_token": "4a64908fa2f43a70210200b87e8be3beb0230d87c49660fea6c47ebf4ad6bd992ef46"
    }
---------------------------------------------------------------------
CHECK USER BY ACCESS TOKEN
---------------------------------------------------------------------
    GET/api/auth/check-user
    Request header{
        "auth-service-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU5ZjM1NDhjMWE4MTMxODAzY2VhM2MiLCJwaG9uZSI6Iis5OTE5OTI2MjIxMTUiLCJleHBpcmVzIjoxNjI1OTg5NDUzMzA0LCJpYXQiOjE2MjU5NDYyNTMsImV4cCI6MTYyNTk0NzE1M30.NW4nNaYYOA0DPPphn5PySe87g4Dzo_lgiJ1CH_bGbCU"
    }
--------------------------------------------------------------------
    Response:{
        "isVerified": true,
        "_id": "60ea0b85c8b061c928d81",
        "phone": "+phone number",
        "firstname": "John",
        "lastname": "Doe",
        "createdAt": "2021-07-10T21:05:09.480Z",
        "updatedAt": "2021-07-10T21:05:23.466Z"
    }
-------------------------------------------------------------------
IF FORGOT PASSWORD
-------------------------------------------------------------------
    POST /api/auth/request-send-sms
        request body:{
            "phone":"phone number" // getting veritification sms to your phone
        }
    POST /api/auth/request-send-sms
        request body:{
            "email":"example@email.com" // getting veritification sms to your phone
        }
-------------------------------------------------------------------
        Response:{
            "expiry": 1625951191793 // expiry time
        }
-------------------------------------------------------------------
CONFIRM SET NEW PASSWORD 
------------------------------------------------------------------
    POST /api/auth/confirm
        request body:{
            "phone":"phone number",
            "code":"confirmation code",
            "password:"newpassword"
        }
------------------------------------------------------------------
        Response:{
            "success": "Succeessfully update password"
        }
------------------------------------------------------------------
