declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: 'dev' | 'prod' | 'test';
		SIMPLE_ARRAY: string;
	}
}
