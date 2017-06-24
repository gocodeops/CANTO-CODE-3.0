import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { AssistantPage } from '../assistant/assistant';
import { ServicesPage } from '../services/services';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root = AssistantPage;
  tab3Root = ServicesPage;

  constructor() {

  }
}
