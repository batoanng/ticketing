import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_SERVER,
  },
});

expirationQueue.process(async (job) => {
  console.log(
    "Publish an expiration:completed event for orderId",
    job.data.orderId
  );
});

export { expirationQueue };
