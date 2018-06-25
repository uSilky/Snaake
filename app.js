const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on("ready", () => {

  console.log(`BOT ON!`); 

});

client.login(config.token);

client.on("message", async message => {

    if(message.author.bot) return;
    
    if(message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

if(command === "anunciar") {
  message.delete().catch(O_o=>{});
  if (message.member.hasPermission('MANAGE_GUILD')) {  
         
      let mensg = args.join(" ");
      if(!mensg)
         return message.channel.send("Digite a mensagem de aviso!")
         
      const anuncio = new Discord.RichEmbed()
         .setColor("0cff00")
         .setAuthor("Anúncio", "https://cdn.discordapp.com/attachments/459789101361528852/460560061287104532/emoji.png")
         
         .setDescription(mensg)
         
         .setTimestamp()
         .setFooter(`Copyright© - Snaake Community` , message.author.avatarURL)    
      
      message.channel.send("@everyone", anuncio)

  }
}
if(command === "setcargo") {
    message.delete().catch(O_o=>{});
    if (message.member.hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) {
     const comousar = new Discord.RichEmbed()
        .setAuthor("Snaake", client.user.avatarURL)
        .setTitle("k!setcargo")
        .setDescription(`Ira adicionar o cargo ao usuário mencionado.`)
        .setColor("#60d1f6")
        .setFooter("© Snaake - Luan Productions")
        .addField("Como usar", "`k!setcargo @usuário <nome do cargo>`")
        .addField("Permissão", "O staff que for adicinar o cargo tem que está em um cargo com a permissão `Gerenciar cargos`")
        .addField("Info", "A **minha** permissão tem que está **acima dos cargos** que eu vou adicionar!")
    let member = message.mentions.members.first();
    if(!member)
     return message.channel.send(comousar).then(msg => msg.delete(10000));
    let rolename = args.slice(1).join(' ');
    if(!rolename)
     return message.channel.send("por favor, digite o cargo para adicionar! (**OBS:** Digite sem o @ e se tiver emojis, digite com emojis! :)").then(msg => msg.delete(10000));
    
     if (!message.guild.roles.find("name", rolename)) {
       
         const norole = new Discord.RichEmbed()
            .setColor("ff0000")
            .setAuthor('Deu um erro', client.user.avatarURL)
            
            .setDescription(`${message.author}, o cargo **${rolename}** não existe (**OBS:** Coloque o nome do cargo certo, emojis, minúsculo e maiúsculo nos lugares certos.)`)
         
         
            .setTimestamp()
            .setFooter("© Snaake ERRO", message.author.avatarURL)
         
         message.channel.send(norole)
         return;
         
        } else {
           let role = message.guild.roles.find("name", rolename);
           member.addRole(role)
           message.reply(`cargo `+ "`" +rolename + "`" + ` setado com sucesso em ${member}! :white_check_mark:`).then(msg => msg.delete(5000));
         
     }
    let role = message.guild.roles.find("name", rolename);
    if(message.guild.channels.find("name", "change-log")){
     let guild = message.guild.channels.find("name", "change-log");
     const changelog = new Discord.RichEmbed()
       .setTitle("https://cdn.discordapp.com/attachments/459789101361528852/460564584051376148/emoji.png CHANGE-LOG")
       .setDescription(member+ " ingressou à equipe como " +role+"!\n\nQuer participar de nossa equipe? Fale diretamente com o @Snaake#8100 **Boa sorte**!\nAtenciosamente, **SNAAKE | COMMUNITY**")
       .setColor(role.color)
       .setFooter(`Copyright© - Snaake Community` , message.author.avatarURL)    
     guild.send(changelog) 
    }
    }else {
         const emojinop = client.guilds.get("420316735149965322").emojis.find("name", "SnaakeNop");
         message.reply("você não tem permissão! " + emojinop).then(msg => msg.delete(5000));
    }
}
});