import {makeAutoObservable} from 'mobx';
import {NavigationProp} from '@react-navigation/native';

class store {
  categorySlug = '';
  nav: NavigationProp<any> | undefined;

  constructor() {
    makeAutoObservable(this);
  }
  changeCategory(slug: string) {
    this.categorySlug = slug;
  }

  changeNavigation(navigation: NavigationProp<any>) {
    this.nav = navigation;
  }
}

export default new store();
