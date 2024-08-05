export type orderType = 'asc' | 'desc';

export interface CountryData {
	country: string;
	code: string;
	vat: number;
}

export interface Metadata {
	id: string;
	private: boolean;
	createdAt: string;
}

export interface ApiResponse {
	record: CountryData[];
	metadata: Metadata;
}
