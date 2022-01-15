
module.exports = async (Discord, client) => {
    const guild = client.guilds.cache.get('662102454720004103');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('877236658238525521');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating Member Count: ')


    }, 15000);
}
