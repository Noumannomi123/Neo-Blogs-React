import { sendToQueue, connection, channel } from "../config/mq.js";
const msgz = String("like1 dislike1 like2 like3").split(' ');

msgz.forEach((msg) => {
    sendToQueue(channel,msg);
})

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
