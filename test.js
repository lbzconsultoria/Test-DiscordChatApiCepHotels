const config = require('./config.js')
const { Client, Intents } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
] });

const prefix = ':'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('error', m => console.log('debug', new Error(m).stack));
client.on('reconnecting', m => console.log('reconnecting', m));

client.on('messageCreate', async message => {
    if (true) {

      if (message.content) {
      // if (message.content && message.channel.id == '976914488538308678') {

        try {
          if(message.content.startsWith(`${prefix}hoteis`)){

            let address = await checkHotels(message.content.substring(8)) 

            message.delete()
            message.channel.send(`\`\`\` \n Consulta feita por : ${message.author.tag} \n ____________________________________________ \n \`\`\` [Ver Mapa](${address})`)

          }

          if(message.content.startsWith(`${prefix}cep`)){

            let address = await checkCep(message.content.substring(5,13)) 

            message.delete()
            message.channel.send(`\`\`\` \n Consulta feita por : ${message.author.tag} \n ____________________________________________ \n Cep : ${address.data.cep} \n Logradouro : ${address.data.logradouro} \n Complemento : ${address.data.complemento}\n Bairro : ${address.data.bairro}\n Municipio : ${address.data.localidade}\n UF : ${address.data.uf} \`\`\``)

          }

          if(message.content.startsWith(`${prefix}endereco`)){
            message.delete()
            let address = await checkEndereco(message.content.substring(10))
            address = address
            .map(ad => `Cep: ${ad.cep}\n Uf: ${ad.uf}\n Cidade: ${ad.cidade}\n Bairro: ${ad.bairro}\n Logradouro: ${ad.logradouro}\n ________________________ \n`)
            .join(' ')


            if(address.length > 1900){

              message.channel.send(`\`\`\` \n Consulta feita por : ${message.author.tag} \n ___________________Pag 1__________________ \n\n ${address.substring(0,1900)}  \`\`\``)
              if(address.length > 1900){
              message.channel.send(`\`\`\` \n _____________Continuando consulta de ${message.author.tag}______________Pag 2____________ \n\n ${address.substring(1900,3800)}  \`\`\``) 
              }
              if(address.length > 3800){
                message.channel.send(`\`\`\` \n _______________Continuando consulta de ${message.author.tag}___________Pag 3_____________ \n\n ${address.substring(3800,5700)}  \`\`\``) 
              }
              if(address.length > 5700){
                message.channel.send(`\`\`\` \n _______________Continuando consulta de ${message.author.tag}___________Pag 4____________ \n\n ${address.substring(5700,7600)}  \`\`\``) 
              }              

            }else{
              message.channel.send(`\`\`\` \n Consulta feita por : ${message.author.tag} \n ____________________________________________ \n ${address}  \`\`\``)
            }

          }

        } catch (error) {
          message.delete()
          message.channel.send(
            `\`\`\`
            Consulta feita por : ${message.author.tag} 
            ____________________________________________
            Error : ${error}
            
            \`\`\``)

        }

      }

 
    }
  });
  
  

  async function checkCep(cep){

    cep = Number(cep)

    if(typeof(cep) == `number` && String(cep).length != 8 ){
      return new Promise((resolve,reject)=> reject('O tamanho do cep deve conter somente numeros com (8) oito digitos Ex: 96070105'))
    }

    return axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(response => response).catch(error => error.message)
  }


  async function checkEndereco(logradouro){

    logradouro = logradouro.split(' ').join('-')
   
    //console.log(logradouro)
    if(typeof(logradouro) != 'string' && String(logradouro).length < 1){
      return new Promise((response, reject)=> reject('algum error'))
    }

    return axios.get(`http://cep.la/${logradouro}`,{'headers':{'Accept':'application/json'}}).then(response => response.data).catch(error => error.message)
  }

  async function checkHotels(logradouro){
    
    logradouro = logradouro.split(' ').join('+')

    return `https://www.google.com/maps/search/hotels+near+${logradouro}`
    
  }


client.login(config.discord_api_key);