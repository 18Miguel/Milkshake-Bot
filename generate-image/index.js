const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");

const background = ['https://i.imgur.com/bI7Y9Js.jpg',
                    'https://i.imgur.com/9kA4hYs.jpg',
                    'https://i.imgur.com/jxt4Hrm.jpg',
                    'https://i.imgur.com/navlToh.jpg'];

const cardDim = {
    height: 540,
    width: 1280,
    margin: 10
};

const avatarDim = {
    size: 256,
    x: 512, /* ((1280/2) - (256/2)) */
    y: 100
};

const generateImage = async (member, message) => {
    let username = member.user.username;
    let avatarURL = member.user.displayAvatarURL({ format: "png", dynamic: false, size: avatarDim.size });

    const canvas = createCanvas(cardDim.width, cardDim.height);
    const ctx = canvas.getContext("2d");

    /* draw in the background */
    const randomNumber = Math.floor(Math.random() * (background.length));
    const backgroundimg = await loadImage(background[randomNumber]);
    ctx.drawImage(backgroundimg, 0, 0, cardDim.width, cardDim.height);

    /* draw black tinted box */
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(cardDim.margin, cardDim.margin, cardDim.width - 2 * cardDim.margin, cardDim.height - 2 *cardDim.margin);

    const avatarImg = await loadImage(avatarURL);
    ctx.save();
    
    ctx.beginPath();
    ctx.arc(avatarDim.x + avatarDim.size / 2, avatarDim.y + avatarDim.size / 2, avatarDim.size / 2, 0, Math.PI * 2, true);
    /* ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 42.5) + ',' + Math.floor(255 - 42.5) + ')';
    ctx.stroke(); */
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatarImg, avatarDim.x, avatarDim.y);
    ctx.restore();

    /* write in text */
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';

    /* draw in Welcome */
    /* ctx.font = "80px Calibri"
    ctx.fillText("Welcome",cardDim.width/2,cardDim.margin + 70); */ /* Center */

    /* draw in the username */
    ctx.font = "60px Calibri";
    ctx.fillText(message, cardDim.width/2, cardDim.height -cardDim.margin - 70);

    /* draw in to the server */
    /* ctx.font = "40px Calibri";
    ctx.fillText("to the server",cardDim.width/3 * 2,cardDim.height/3 * 2); */

    return new MessageAttachment(canvas.toBuffer(), "image.png");
};

module.exports = generateImage