import {makeAutoObservable} from 'mobx';
import {NavigationProp} from '@react-navigation/native';

class store {
  categorySlug = '';
  city: string = 'odesa';
  nav: NavigationProp<any> | undefined;

  constructor() {
    makeAutoObservable(this);
  }
  changeCategory(slug: string) {
    this.categorySlug = slug;
  }
  changeCity(city: string) {
    this.city = city;
  }
  changeNavigation(navigation: NavigationProp<any>) {
    this.nav = navigation;
  }
}

export default new store();
