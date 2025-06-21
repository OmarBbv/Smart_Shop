import { httpClient } from "@/config/httpClient";
import { BannerProduct } from "@/types/heroTypes"

interface HeroServiceTypes {
    getAllHero(): Promise<BannerProduct[]>
}

class HeroService implements HeroServiceTypes {
    async getAllHero(): Promise<BannerProduct[]> {
        try {
            const res = await httpClient.get('/heros');
            return res.data.data
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export const heroService = new HeroService();