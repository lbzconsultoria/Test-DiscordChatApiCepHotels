# APLICATION TEST TO DISCORD


### Dependencies

```
Discord.js
Axios

```

## APIs Used Documentation

https://viacep.com.br

http://cep.la/

https://discord.com/developers/docs

### Copy and name file config.example.js to config.js

```
module.exports = {
    discord_api_key : "YOUR KEY HERE" 
}
```

### Then Start 
```

pnpm start

```

### Invite Bot on Discord 
https://discord.com/developers/docs/game-sdk/applications

### Use URL Generator

https://discord.com/developers/applications/

### Select 

Scope -> bot

Bot Permission -> Administrator

### Commands test

```
:cep 30320900

Return :

 Consulta feita por : Nickname#9999 
 ____________________________________________ 
 Cep : 30320-900 
 Logradouro : Rodovia BR-356 
 Complemento : 3049
 Bairro : Belvedere
 Municipio : Belo Horizonte
 UF : MG 

```


```
:endereco Belvedere

Return : 
Consulta feita por : Nickname#9999 
 ___________________Pag 1__________________ 

 Cep: 12954410
 Uf: SP
 Cidade: Atibaia
 Bairro: Atibaia Belvedere
 Logradouro: Rua do Belvedere
 ________________________ 
 Cep: 15056082
 Uf: SP
 Cidade: São José do Rio Preto
 Bairro: Belvedere Terra Nova
 Logradouro: Avenida Belvedere


```

```
:hoteis  Avenida Amazonas, 85, Centro, Belo Horizonte



Return :

 Consulta feita por : Nickname#9999
 ____________________________________________ 
 
 [Ver Mapa](https://www.google.com/maps/search/hotels+near++Avenida+Amazonas,+85,+Centro,+Belo+Horizonte)


```

