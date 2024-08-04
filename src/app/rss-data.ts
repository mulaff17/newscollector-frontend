export interface RssData {
    id: number;
    title: string;
    link: string;
    pub_date: string;
    creator: string;
    guid: string;
    image?: Buffer;
    news_site_id: number;
}
