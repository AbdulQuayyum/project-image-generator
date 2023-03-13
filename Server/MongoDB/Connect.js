import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(url)
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

export default connectDB;