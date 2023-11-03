// Create Web Server
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const template = require('./lib/template.js');
const path = require('path');
const sanitizeHtml = require('sanitize-html');

// Create Web Server
const app = http.createServer((req, res) => {
    const _url = req.url;
    const queryData = url.parse(_url, true).query;
    const pathname = url.parse(_url, true).pathname;
    let title = queryData.id;
    let description = queryData.id;
    let id = queryData.id;

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir('./data', (err, filelist) => {
                title = 'Welcome';
                description = 'Hello, Node.js';
                const list = template.list(filelist);
                const html = template.html(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                res.writeHead(200);
                res.end(html);
            });
        } else {
            fs.readdir('./data', (err, filelist) => {
                title = queryData.id;
                const filteredId = path.parse(title).base;
                fs.readFile(`./data/${filteredId}`, 'utf8', (err, description) => {
                    const sanitizedTitle = sanitizeHtml(title);
                    const sanitizedDescription = sanitizeHtml(description, {
                        allowedTags: ['h1']
                    });
                    const list = template.list(filelist);
                    const html = template.html(sanitizedTitle, list, `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`, `<a href="/create">create</a>
                    <a href="/update?id=${sanitizedTitle}">update</a>
                    <form action="delete_process" method="post" onsubmit="return confirm('Are you sure?')">
                        <input type="hidden" name="id" value="${sanitizedTitle}">
                        <input type="submit" value="delete">
                    </form>`);
                    res.writeHead(200);
                    res.end(html);
                });
            });
        }
    } else if (pathname === '/create') {
        fs.readdir('./data', (err, filelist) => {
            title = 'WEB - create';
            const list = template.list(filelist);
            const html = template.html(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `, '');
            res.writeHead(200);
            res.end(html);
        }