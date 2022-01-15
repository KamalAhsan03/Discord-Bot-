var Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: true,
    },
});

module.exports = {
    name: 'image',
    description: 'Sends an image to a channel',
    async execute(msg, args) {
        const image_query = args.join(' ');
        if (!image_query) return msg.channel.send('Send the image name please :gun: ');

        const image_results = await google.scrape(image_query, 1);
        msg.channel.send(image_results[0].url);
    }
}