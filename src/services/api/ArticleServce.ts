import BaseService from './BaseService';
import { article } from './urls';

class ArticleService {
    static get_list_product = () =>
        BaseService.getRequest(article.PRODUCTS_SUCCESS,  false);

        static get_fav_fail = () =>
        BaseService.getRequest(article.FAVORITE_FAIL,  false)

        static get_fav_success = () =>
        BaseService.getRequest(article.FAVORITE_SUCCESS,  false)

        static get_filter_success= () =>
        BaseService.getRequest(article.FILTER_SUCCESS,  false)

        static get_filter_fail = () =>
        BaseService.getRequest(article.FAVORITE_FAIL,  false)

}

export default ArticleService;
