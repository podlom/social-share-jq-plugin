# Social share plugin (jquery)

### Installation
```sh
$ npm i
```

### Build

Production Build:
```sh
$ gulp build
```

Production build + Webserver + Watch:
```sh
$ gulp
```

### Settings
```js
$('.your-block').angelSharePlugin({
	autoUtm: false, // Add utm params to share link
	urlParams: false, // Add url params from share page
	autoMessage: false, // Add message to twitter, telegram
	rounded: false, // Make btns rounded
	btns: ['facebook', 'twitter', 'telegram'] // You can live only needed elements
})
```


