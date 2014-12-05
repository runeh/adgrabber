adgrabber
=========

Download all ads for ad ids in file. Ad ids are newline separated. Default concurrency is 1. You probably want 8 or something.

Output is sent to stdout, newline separated.

adid,<JSON of ad>\n

Errors go to stderr.

node index.js ad-id-file.txt [concurrency]

Run 'npm install' before running it. 
