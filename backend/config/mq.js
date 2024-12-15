#!/usr/bin/env node

import amqp from "amqplib/callback_api.js"
const QUEUE = 'task_queue';

// Function to establish connection and channel setup
const connectToRabbitMQ = () => {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                reject('Connection error: ' + error0);
            } else {
                connection.createChannel((error1, channel) => {
                    if (error1) {
                        reject('Channel error: ' + error1);
                    } else {
                        resolve({ connection, channel });
                    }
                });
            }
        });
    });
}

export const sendToQueue = async (channel, msg) => {
    try {
        channel.assertQueue(QUEUE, {
            durable: true
        });

        channel.sendToQueue(QUEUE, Buffer.from(msg), {
            persistent: true
        });
        console.log(" [x] Sent '%s'", msg);
    } catch (error) {
        console.error('Error sending message: ', error);
    }
};

export const consumeFromQueue = async (channel) => {
    try {
        channel.assertQueue(QUEUE, {
            durable: true
        });
        channel.prefetch(1);

        console.log(" [*] Waiting for messages in %s. To exit press Ctrl+C", QUEUE);

        channel.consume(QUEUE, (msg) => {
            if (msg !== null) {

                // Simulate processing
                setTimeout(() => {
                    console.log(" [x] Done processing '%s'", msg.content.toString());
                    channel.ack(msg);  // Acknowledge the message after processing
                }, 1000);
            }
        }, {
            noAck: false  // Ensure we acknowledge the message after processing
        });

    } catch (error) {
        console.error('Error consuming message: ', error);
    }
};

const { connection, channel } = await connectToRabbitMQ();

export { connection, channel }
