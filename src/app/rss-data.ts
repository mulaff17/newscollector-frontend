export interface RssData {
    id: number;
    title: string;
    link: string;
    pubDate: string;
    creator: string;
    guid: string;
    image?: Buffer;
    news_site_id: number;
}
