const axios = require('axios');
const fs = require('fs');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

async function processFiles() {
    try {
        const rawData = fs.readFileSync('data.json', 'utf-8');
        const data = JSON.parse(rawData);

        for (const link of data) {
            const response = await axios.head(link.url);

            if (response.request?.res?.responseUrl !== null) {
                const url = new URL(response.request.res.responseUrl);
                const downloadUrl = `https://api.onedrive.com/v1.0/drives/${url.searchParams.get('cid')}/items/${url.searchParams.get('resId')}/content?authkey=${url.searchParams.get('authkey')}`;

                console.log(`Downloading ${link.fileName} from ${downloadUrl}...`);
                await axios
                    .get(encodeURI(downloadUrl), {
                        responseType: 'stream'
                    })
                    .then(res => {
                        console.log('Saving to file...');
                        return pipeline(res.data, fs.createWriteStream(`./${link.fileName}`));
                    });
                console.log('Done!');
            }
        }
    } catch (error) {
        console.error('Error processing files:', error.message);
    }
}

processFiles();
