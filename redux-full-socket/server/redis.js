import redis from 'redis';

const getRedisAsyncStorage = (prefix) => {
	const client = redis.createClient();

	return {
		getItem: (key, callback) => client.get(key, callback),
		setItem: (key, value, callback) => client.set(key, value, callback),
		removeItem: (key, callback) => client.del(key, callback),
		getAllKeys: (callback) => client.keys(prefix+'*', callback)
	};

}

export default getRedisAsyncStorage;