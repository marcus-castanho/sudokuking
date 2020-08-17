const es2015 = require('babel-preset-es2015');
const presetReact = require('babel-preset-react');
require('babel-register'); ({
    presets: [es2015, presetReact]
});

const router = require("./routes").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router())
            .build("https://www.sudoku-king.com")
            .save("../public/sitemap.xml")
    );
}

generateSitemap();

/*
const Sitemap = require("react-router-sitemap").default;
import Routes from './routes';
import fs from 'fs'
const hostname = 'http://www.sudoku-king.com';
const dest = path.resolve('./public', 'sitemap.xml');
const sitemap = Sitemap(hostname, Routes);
fs.writeFileSync(dest, sitemap.toString())*/