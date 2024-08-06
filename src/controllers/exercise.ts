import { ApiResponse, orderType } from '../models/exercise';
import { request } from 'undici';
import vowels from '../utils/vowels';

class ExerciseController {
	async getData(filter: string, order: orderType) {
		try {
			const { statusCode, body } = await request(
				'https://api.jsonbin.io/v3/b/5f69afbe65b18913fc510ce8'
			);

			if (statusCode !== 200) {
				throw new Error(`Request failed with status code: ${statusCode}`);
			}

			const data: ApiResponse = await (body.json() as Promise<ApiResponse>);

			let { record: records } = data;

			if (filter) {
				const searchFilter = filter.toLowerCase();
				records = records.filter(
					item =>
						item.country.toLowerCase().includes(searchFilter) ||
						item.code.toLowerCase().includes(searchFilter)
				);
			}

			if (order) {
				records.sort((a: { vat: number }, b: { vat: number }) =>
					order === 'asc' ? a.vat - b.vat : b.vat - a.vat
				);
			}

			return records;
		} catch (error) {
			console.error(`Fetch error: ${error}`);
			throw error;
		}
	}

	reverse(word: string) {
		let result = '';

		for (let i = word.length - 1; i >= 0; i--) {
			const char = word[i];
			result += vowels.includes(char.toLowerCase())
				? char.toUpperCase()
				: char;
		}

		return result;
	}

	append(start: string, end: string) {
		if (!process.env.SIMPLE_ARRAY) {
			throw new Error('SIMPLE_ARRAY not set');
		}

		let newArr: string[] = [];

		try {
			newArr = JSON.parse(process.env.SIMPLE_ARRAY);
		} catch (e) {
			throw new Error('SIMPLE_ARRAY is not a valid JSON array');
		}

		if (start) {
			newArr.unshift(start);
		}
		if (end) {
			newArr.push(end);
		}

		return newArr;
	}
}

export default new ExerciseController();
