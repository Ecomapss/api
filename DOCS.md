# Ecomapss-API v0.8.4

Documetation of ecomapss api project

- [Area](#area)
	- [Create area](#create-area)
	- [Delete area](#delete-area)
	- [Retrieve area](#retrieve-area)
	- [Retrieve areas](#retrieve-areas)
	- [Update area](#update-area)
	
- [AreaElemento](#areaelemento)
	- [Create area elemento](#create-area-elemento)
	- [Delete area elemento](#delete-area-elemento)
	- [Retrieve area elemento](#retrieve-area-elemento)
	- [Retrieve area elementos](#retrieve-area-elementos)
	- [Update area elemento](#update-area-elemento)
	
- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Elemento](#elemento)
	- [Create elemento](#create-elemento)
	- [Delete elemento](#delete-elemento)
	- [Retrieve elemento](#retrieve-elemento)
	- [Retrieve elementos](#retrieve-elementos)
	- [Update elemento](#update-elemento)
	
- [Fauna](#fauna)
	- [Create fauna](#create-fauna)
	- [Delete fauna](#delete-fauna)
	- [Retrieve fauna](#retrieve-fauna)
	- [Retrieve faunas](#retrieve-faunas)
	- [Update fauna](#update-fauna)
	
- [Historia](#historia)
	- [Create historia](#create-historia)
	- [Delete historia](#delete-historia)
	- [Retrieve historia](#retrieve-historia)
	- [Retrieve historias](#retrieve-historias)
	- [Update historia](#update-historia)
	
- [Mail](#mail)
	- [Create mail](#create-mail)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Regiao](#regiao)
	- [Create regiao](#create-regiao)
	- [Delete regiao](#delete-regiao)
	- [Retrieve regiao](#retrieve-regiao)
	- [Retrieve regiaos](#retrieve-regiaos)
	- [Update regiao](#update-regiao)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Area

## Create area



	POST /areas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| nome			| 			|  <p>Area's nome.</p>							|
| categoria			| 			|  <p>Area's categoria.</p>							|
| areacol			| 			|  <p>Area's areacol.</p>							|

## Delete area



	DELETE /areas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve area



	GET /areas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve areas



	GET /areas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update area



	PUT /areas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| nome			| 			|  <p>Area's nome.</p>							|
| categoria			| 			|  <p>Area's categoria.</p>							|
| areacol			| 			|  <p>Area's areacol.</p>							|

# AreaElemento

## Create area elemento



	POST /area-elementos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| id_area			| 			|  <p>Area elemento's id_area.</p>							|
| id_elemento			| 			|  <p>Area elemento's id_elemento.</p>							|

## Delete area elemento



	DELETE /area-elementos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve area elemento



	GET /area-elementos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve area elementos



	GET /area-elementos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update area elemento



	PUT /area-elementos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| id_area			| 			|  <p>Area elemento's id_area.</p>							|
| id_elemento			| 			|  <p>Area elemento's id_elemento.</p>							|

# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

# Elemento

## Create elemento



	POST /elementos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| info			| 			|  <p>Elemento's info.</p>							|
| estado			| 			|  <p>Elemento's estado.</p>							|

## Delete elemento



	DELETE /elementos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve elemento



	GET /elementos/:id


## Retrieve elementos



	GET /elementos


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update elemento



	PUT /elementos/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| info			| 			|  <p>Elemento's info.</p>							|
| estado			| 			|  <p>Elemento's estado.</p>							|

# Fauna

## Create fauna



	POST /faunas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| nome_popular			| 			|  <p>Fauna's nome_popular.</p>							|
| nome_cientifico			| 			|  <p>Fauna's nome_cientifico.</p>							|
| ordem			| 			|  <p>Fauna's ordem.</p>							|
| reino			| 			|  <p>Fauna's reino.</p>							|
| filo			| 			|  <p>Fauna's filo.</p>							|
| classe			| 			|  <p>Fauna's classe.</p>							|
| elemento_id			| 			|  <p>Fauna's elemento_id.</p>							|

## Delete fauna



	DELETE /faunas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve fauna



	GET /faunas/:id


## Retrieve faunas



	GET /faunas


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update fauna



	PUT /faunas/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| nome_popular			| 			|  <p>Fauna's nome_popular.</p>							|
| nome_cientifico			| 			|  <p>Fauna's nome_cientifico.</p>							|
| ordem			| 			|  <p>Fauna's ordem.</p>							|
| reino			| 			|  <p>Fauna's reino.</p>							|
| filo			| 			|  <p>Fauna's filo.</p>							|
| classe			| 			|  <p>Fauna's classe.</p>							|
| elemento_id			| 			|  <p>Fauna's elemento_id.</p>							|

# Historia

## Create historia



	POST /historias


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| titulo			| 			|  <p>Historia's titulo.</p>							|
| descricao			| 			|  <p>Historia's descricao.</p>							|
| elemento_id			| 			|  <p>Historia's elemento_id.</p>							|

## Delete historia



	DELETE /historias/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve historia



	GET /historias/:id


## Retrieve historias



	GET /historias


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update historia



	PUT /historias/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| titulo			| 			|  <p>Historia's titulo.</p>							|
| descricao			| 			|  <p>Historia's descricao.</p>							|
| elemento_id			| 			|  <p>Historia's elemento_id.</p>							|

# Mail

## Create mail



	POST /mail


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Regiao

## Create regiao



	POST /regioes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| cidade			| 			|  <p>Regiao's cidade.</p>							|
| uf			| 			|  <p>Regiao's uf.</p>							|

## Delete regiao



	DELETE /regioes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve regiao



	GET /regioes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|

## Retrieve regiaos



	GET /regioes


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update regiao



	PUT /regioes/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>admin access token.</p>							|
| cidade			| 			|  <p>Regiao's cidade.</p>							|
| uf			| 			|  <p>Regiao's uf.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


