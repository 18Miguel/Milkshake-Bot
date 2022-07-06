# Youtube Notification

## Usage
```js
const YouTubeNotification = require('./youtube-notification');
const Notification = new YouTubeNotification({
    channels: ['A channel ID', 'Another channel ID'],
    checkInterval: 60 /* Interval to check the latest video in sec. */
});

Notification.on('video', video => {
    console.log(video);
    console.log(video.channelName);
    console.log(video.channelID);
    console.log(video.title);
    console.log(video.publishDate);
    console.log(video.url);
    console.log(video.id);
});
```
## Methods
### Notification.addChannels()
| Parameter | Type | Returns |
| --- | --- | --- |
| channels | array | Promise |
### Notification.removeChannels()
| Parameter | Type | Returns |
| --- | --- | --- |
| channels | array | Promise |
