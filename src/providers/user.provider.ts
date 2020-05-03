import {Injectable} from '@graphql-modules/di';

@Injectable()
export class UserProvider {
  getUserById(id: string){
    return {
      _id: id,
      userName:'john'
    };
  }
}
