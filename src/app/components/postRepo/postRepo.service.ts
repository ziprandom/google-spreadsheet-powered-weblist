import { BlockspringApi } from '../blockspringApi/blockspringApi.service';

export interface IPost {
  name: string;
  fullname: string;
  category: string[];
  description: string;
  time: string;
  website: string;
  facebook: string;
  region: string;
}

export interface IPostDictionary {
  [index: string]: IPost[];
}

export class PostRepo {

  /* @ngInject */
  constructor(private blockspringApi: BlockspringApi) {
  }

  public tags: IPostDictionary = {};

  loadUrl(url: string): angular.IPromise<any[]> {
    return this.blockspringApi.getSpreadsheet(url).then( (data: any) => {
      return [data.map((data: any) => {
	data.tags = (data.category || ' ').split(',');
	$.each(data.tags, (index: number, tag: string) => {
	  this.addPostForTag(tag, data);
	});
	return data;
      }), this.tags];
    });
  }

  addPostForTag(tag: string = '', post: IPost): void {
    if (tag !== '') {
      if (this.tags.hasOwnProperty(tag)) {
	this.tags[tag].push(post);
      } else {
	this.tags[tag] = [post];
      }
    }
  }

}
