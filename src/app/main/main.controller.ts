import { PostRepo, IPost, IPostDictionary } from '../components/postRepo/postRepo.service';
import { Config } from '../app.config';

export class MainController {
  public classAnimation: string;
  public posts: IPost[];
  public tags: IPostDictionary;
  public activeCategory: string = '';
  public searchActive: boolean = false;
  public searchTerm: string = '';
  /* @ngInject */
  constructor ($timeout: angular.ITimeoutService, public postRepo: PostRepo) {
    this.config = Config;
    postRepo.loadUrl(Config.googleSpreadsheetUrl).then((data: any[]) => {
      this.posts = data[0];
      this.tags = data[1];
    });
  }

  public getActiveSelectionPosts(): IPost[] {
    if (this.activeCategory === '' || this.searchActive ) {
      return this.posts;
    } else {
      return this.tags[this.activeCategory];
    }
  }

  public toggleActiveCategory(tag: string) {
    if (this.activeCategory === tag) {
      this.activeCategory = '';
    } else {
      this.activeCategory = tag;
    }
  }
}
