export type Tab = 'home' | 'search' | 'portfolio' | 'profile';

export type Filter = 'name' | 'id' | 'illustrator';

export type UserCollection = Record<string, CardInstance[]>;

export type CardCondition = 'NM' | 'LP' | 'MP' | 'HP' | 'DM';
export type CardVariant = 'normal' | 'holo' | 'reverse' | 'first-edition';

export interface CardInstance {
	v: CardVariant;
	c: CardCondition;
	q: number;
	a: number;
}
