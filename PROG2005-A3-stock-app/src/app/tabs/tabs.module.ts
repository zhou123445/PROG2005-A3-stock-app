import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TabsPage } from './tabs.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsPage,
        children: [
          { path: 'tab1', loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule) },
          { path: 'tab2', loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule) },
          { path: 'tab3', loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule) },
          { path: 'privacy', loadComponent: () => import('../privacy/privacy.page').then(m => m.PrivacyPage) },
          { path: '', redirectTo: 'tab1', pathMatch: 'full' }
        ]
      }
    ])
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}