import { Component } from '@angular/core';

import { LoginPage } from '../login/login';
import { AssistantPage } from '../assistant/assistant';
import { ServicesPage } from '../services/services';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = AssistantPage;
  tab3Root = ServicesPage;

  constructor() {

  }
}
