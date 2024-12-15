#!/usr/bin/env node

import amqp from "amqplib/callback_api.js"
const exchange = 'logs';
import { db } from "../index.js";
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
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.publish(exchange, '', Buffer.from(msg));
        console.log(" [x] Sent '%s'", msg);
    } catch (error) {
        console.error('Error sending message: ', error);
    }
};

export const updateLikesTable = async (channel) => {
    try {
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });

        channel.assertQueue('', {
            exclusive: true
        }, function (error2, q) {
            if (error2) {
                throw error2;
            }
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, async function (msg) {
                if (msg.content) {
                    const { user_id, blog_id, action } = JSON.parse(msg.content.toString());
                    console.log("Received, prcoessing to insert likes: ")
                    try {
                        await db.query("INSERT INTO likes (user_id, post_id) VALUES ($1, $2)", [user_id, blog_id]);
                    } catch (error) {
                        console.error("Could not insert likes into table. ", error);
                        return 403;
                    }
                    console.log(" [x] Done processing '%s'", msg.content.toString());
                    channel.ack(msg);  // Acknowledge the message after processing
                }
            }, {
                noAck: false  // Set noAck to false to manually acknowledge messages
            });
        });
        return 200;
    } catch (error) {
        console.error('Error consuming message: ', error);
    }
};

const { connection, channel } = await connectToRabbitMQ();

export { connection, channel }
