import redis from 'redis';

const getRedisAsyncStorage = () => {
	const client = redis.createClient();
	const prefix = 'rfs/';
	const redisKey = key => prefix+key;


	return {
		getItem: (key, callback) => {
			client.get(redisKey(key), callback)
		},
		setItem: (key, value, callback) => {
			client.set(redisKey(key), value, callback)
		},
		removeItem: (key, callback) => {
			client.del(redisKey(key), callback)
		},
		getAllKeys: (callback) => {
			client.keys(redisKey('*'), callback)
		}
	};

}

export default getRedisAsyncStorage;