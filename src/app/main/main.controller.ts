import { PostRepo, IPost, IPostDictionary } from '../components/postRepo/postRepo.service';

export class MainController {
  public classAnimation: string;
  public posts: IPost[];
  public tags: IPostDictionary;
  public activeCategory: string = '';
  public searchActive: boolean = false;
  public searchTerm: string = '';
  /* @ngInject */
  constructor ($timeout: angular.ITimeoutService, public postRepo: PostRepo) {
    var that = this;
    postRepo.loadUrl("<enter-the-url-of-you-google-spreadsheet-here>").then((data: any[]) => {
      that.posts = data[0];
      that.tags = data[1];
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
