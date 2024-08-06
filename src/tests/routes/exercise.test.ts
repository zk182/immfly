import request from 'supertest';
import express from 'express';
import ExerciseRouter from '../../server/routes/exercise';

const app = express();
app.use(express.json());
app.use('/api', ExerciseRouter);

const SIMPLE_ARRAY = JSON.parse(process.env.SIMPLE_ARRAY || '[]');

describe('ExerciseRouter', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('GET /countries', () => {
		it('should return data as array', async () => {
			const response = await request(app).get('/api/countries');

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
		});

		it('should return data as array with filter', async () => {
			const response = await request(app)
				.get('/api/countries')
				.query({ filter: 'lux' });

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.length).toBe(1);
		});

		it('should return expected data as array with order', async () => {
			const response = await request(app)
				.get('/api/countries')
				.query({ order: 'asc' });

			const expected = {
				country: 'Hungary',
				code: 'HU',
				vat: 27
			};

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.pop()).toStrictEqual(expected);
		});

		it('should return data as array with order', async () => {
			const response = await request(app)
				.get('/api/countries')
				.query({ order: 'desc' });

			const expected = {
				country: 'Luxembourg',
				code: 'LU',
				vat: 17
			};

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.pop()).toStrictEqual(expected);
		});

		it('should return data as array with both filter and order', async () => {
			const response = await request(app)
				.get('/api/countries')
				.query({ filter: 'someFilter', order: 'asc' });

			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Array);
		});

		it('should handle invalid order gracefully', async () => {
			const response = await request(app)
				.get('/api/countries')
				.query({ order: 'invalidOrder' });

			expect(response.status).toBe(400);
		});
	});

	describe('GET /reverse/:word', () => {
		it('should return the reversed word with vowels uppercased', async () => {
			const word = 'hello';
			const reversedWord = 'OllEh';

			const response = await request(app).get(`/api/reverse/${word}`);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual(reversedWord);
		});

		it('should return the reversed word without uppercased, should not be strictEqual', async () => {
			const word = 'hello';
			const reversedWord = 'olleh';

			const response = await request(app).get(`/api/reverse/${word}`);

			expect(response.status).toBe(200);
			expect(response.body).not.toStrictEqual(reversedWord);
		});

		it('should return the reversed word with vowels in uppercase for "absolutely"', async () => {
			const word = 'absolutely';
			const expectedReversedWord = 'ylEtUlOsbA';

			const response = await request(app).get(`/api/reverse/${word}`);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual(expectedReversedWord);
		});

		it('should return the reversed word with vowels in uppercase for "communication"', async () => {
			const word = 'communication';
			const expectedReversedWord = 'nOItAcInUmmOc';

			const response = await request(app).get(`/api/reverse/${word}`);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual(expectedReversedWord);
		});
	});

	describe('GET /append', () => {
		it('should return the appended array with start and end', async () => {
			const start = 'Hello';
			const end = 'Bye';

			const response = await request(app)
				.get('/api/append')
				.query({ start, end });

			const expected = [...SIMPLE_ARRAY] as String[];

			expected.unshift(start);
			expected.push(end);

			expect(response.status).toBe(200);
			expect(response.body).toEqual(expected);
		});

		it('should return the array with only start added', async () => {
			const start = 'Hello';

			const response = await request(app)
				.get('/api/append')
				.query({ start });

			const expected = [...SIMPLE_ARRAY] as String[];

			expected.unshift(start);

			expect(response.status).toBe(200);
			expect(response.body).toEqual(expected);
		});

		it('should return the array with only end added', async () => {
			const end = 'Bye';

			const response = await request(app).get('/api/append').query({ end });

			const expected = [...SIMPLE_ARRAY] as String[];

			expected.push(end);

			expect(response.status).toBe(200);
			expect(response.body).toEqual(expected);
		});

		it('should return a bad request', async () => {
			const start = 'Hello';
			const end = '';

			const expected = SIMPLE_ARRAY as String[];
			expected.unshift(start);

			const response = await request(app)
				.get('/api/append')
				.query({ start, end });

			expect(response.status).toBe(400);
		});
	});
});
