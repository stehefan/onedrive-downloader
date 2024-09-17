# Onedrive Downloader

This script downloads files from a OneDrive folder to a local directory, given a OneDrive sharing link in the following
format:

```shell
https://1drv.ms/v/s!3qgZmxd0QPCZaFlHynA_Aib2sfmqQa
```

It automatically follows the redirect to the actual download link, and downloads the file to the directory of the script.

## Usage

1. Clone the repository or download the script.
2. Provide the data in the following format next to the script and name it `data.json`:
```json
[
  {
    "fileName": "test_movie.mp4",
    "url": "https://1drv.ms/v/s!vyaqZ_aKHxfQs28nmqVmkFgid2QACZ"
  },
  {
    "fileName": "test_document.docx",
    "url": "https://1drv.ms/v/s!FnB2dOyhqv0g_PQx3HZVsQCafmmaqi"
  }
]
```
3. Run the script via `node index.js`