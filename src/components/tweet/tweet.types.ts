import { TweetData } from '../../hooks/tweet';

export type TweetObject = TweetData & { click: () => void };
