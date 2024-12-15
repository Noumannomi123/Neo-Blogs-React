import { sendToQueue, connection, channel } from "../config/mq.js";

export const sendLikes = async (req) => {
    const { user_id, blog_id, action } = req.body;
    const msg = JSON.stringify({ user_id, blog_id, action });
    const code = await sendToQueue(channel, msg);
    return code;
}

// Gracefully handle server shutdown
process.on('SIGINT', async () => {
    console.log('\nSIGINT received. Closing RabbitMQ connection...');
    try {
        if (connection) {
            connection.close(() => {
                console.log('RabbitMQ connection closed.');
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error('Error during SIGINT handling:', error);
        process.exit(1); // Exit with error code
    }
});


process.on('SIGTERM', async () => {
    console.log('\nSIGTERM received. Closing RabbitMQ connection...');
    try {
        if (connection) {
            connection.close(() => {
                console.log('RabbitMQ connection closed.');
                process.exit(0);
            });
        } else {
            process.exit(0);
        }
    } catch (error) {
        console.error('Error during SIGTERM handling:', error);
        process.exit(1); // Exit with error code
    }
});
