const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ringtones",
    alias: ["tones", "phonetones",],
    desc: "Check uptime and system status",
    category: "main",
    react:"🎶",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `*🎺SUBZERO RINGTONES🎺*

────────────
1. Querky
2. QUERER QUEREMOS
3. HK47 - Query
4. Query-sms-tone
5. Querida
6. Querido
7. Querer
8. Querersin
9. 8bit Art Of Thedress
10. 8bitartofthedress2
11. Lunas Future
12. Equestria Girls Tone
13. Pony Swag
14. Milkshake Race
15. Evil Enchantress
16. Yay
17. Hush Now Metal Now
18. Mlp Yay
19. BIBIDDY-BOOPY
20. Adventure
21. Sandviches
22. Friendship
23. Redheart - Shh
24. Flutterbeep
25. Nurse Redheart
─────────────

  \`\`\` USAGE EXAMPLE\`\`\`
      \`.ringtone\` Querky


> ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ ʙᴏᴛ`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://i.ibb.co/Y8Bv9P0/mrfrankofc.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363304325601080@newsletter',
                    newsletterName: '𝐒𝐔𝐁𝐙𝐄𝐑𝐎 𝐑𝐈𝐍𝐆𝐓𝐎𝐍𝐄𝐒',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error :", e);
        reply(`An error occurred: ${e.message}`);
    }
});
//======RING TONE
cmd({
    pattern: "ringtone",
    alias: ["ringtones", "ring"],
    desc: "Get a random ringtone from the API.",
    react: "🎵",
    category: "fun",
    filename: __filename,
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("⚠️ Please provide a search query! Example: .ringtone Suna");
        }

        const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

        if (!data.status || !data.result || data.result.length === 0) {
            return reply("No ringtones found for your query. Please try a different keyword.❗");
        }

        const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

        await conn.sendMessage(
            from,
            {
                audio: { url: randomRingtone.dl_link },
                mimetype: "audio/mpeg",
                fileName: `${randomRingtone.title}.mp3`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error("Error in ringtone command:", error);
        reply("Sorry, something went wrong while fetching the ringtone. Please try again later.");
    }
});
